import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const distDirectory = path.join(projectRoot, "dist");
const clientHtmlPath = path.join(distDirectory, "index.html");
const serverBuildDirectory = path.join(projectRoot, ".prerender");

const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const serverBuildFiles = await readdir(serverBuildDirectory);
const serverEntry = serverBuildFiles.find((file) =>
  /^entry-server\.(mjs|js)$/.test(file)
);

if (!serverEntry) {
  throw new Error("The server-render entry was not generated.");
}

const { getPageSeo, prerenderPaths, render } = await import(
  pathToFileURL(path.join(serverBuildDirectory, serverEntry)).href
);

const clientHtml = await readFile(clientHtmlPath, "utf8");
const rootPlaceholder = '<div id="root"></div>';

if (!clientHtml.includes(rootPlaceholder)) {
  throw new Error("Could not find the root element in the production HTML.");
}

for (const routePath of prerenderPaths) {
  const seo = getPageSeo(routePath);
  const appHtml = render(routePath);
  const structuredData = seo.schema
    ? `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(
        seo.schema
      ).replaceAll("<", "\\u003c")}</script>`
    : "";
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow";
  const seoHead = [
    `<link rel="canonical" href="${escapeAttribute(seo.canonical)}" />`,
    `<meta name="robots" content="${robots}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Seamoon Industries" />',
    `<meta property="og:title" content="${escapeAttribute(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(seo.description)}" />`,
    `<meta property="og:image" content="${escapeAttribute(seo.image)}" />`,
    `<meta property="og:url" content="${escapeAttribute(seo.canonical)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttribute(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(seo.image)}" />`,
    structuredData,
  ].join("\n    ");

  const routeHtml = clientHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(seo.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttribute(seo.description)}" />`
    )
    .replace("<!--seo-head-->", seoHead)
    .replace(rootPlaceholder, `<div id="root">${appHtml}</div>`);

  const outputDirectory =
    routePath === "/"
      ? distDirectory
      : path.join(distDirectory, routePath.replace(/^\//, ""));
  const outputFile = path.join(outputDirectory, "index.html");

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputFile, routeHtml, "utf8");
  console.log(`Pre-rendered ${routePath} -> ${path.relative(projectRoot, outputFile)}`);
}
