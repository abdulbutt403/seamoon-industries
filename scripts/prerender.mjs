import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
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

const { getPageSeo, prerenderPaths, render, verificationTokens } = await import(
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
    verificationTokens.google
      ? `<meta name="google-site-verification" content="${escapeAttribute(verificationTokens.google)}" />`
      : "",
    verificationTokens.bing
      ? `<meta name="msvalidate.01" content="${escapeAttribute(verificationTokens.bing)}" />`
      : "",
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

const products = JSON.parse(
  await readFile(path.join(projectRoot, "public/assets/products.json"), "utf8")
);
const categorySlug = (category) =>
  category.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const categoryPaths = [...new Set(products
  .map((product) => product?.category)
  .filter((category) => typeof category === "string" && category.trim())
  .map((category) => `/dental-instruments/${categorySlug(category)}`))];
const sitemapRoutes = [...new Set([...prerenderPaths, ...categoryPaths])]
  .filter((routePath) => !getPageSeo(routePath).noindex);
const sourceByRoute = (routePath) => {
  if (routePath.startsWith("/dental-instruments/")) return "public/assets/products.json";
  return ({
    "/": "src/Home.jsx",
    "/dental-instruments": "public/assets/products.json",
    "/surgical-instruments": "src/pages/SurgicalInstruments.jsx",
    "/oem-private-label": "src/pages/OEMPrivateLabel.jsx",
    "/certifications": "src/pages/CertificationsPage.jsx",
    "/contact": "src/pages/ContactPage.jsx",
  })[routePath];
};
const lastmodBySource = new Map();
const getLastmod = (source) => {
  if (!source) throw new Error("No last-modified source configured for a sitemap route.");
  if (!lastmodBySource.has(source)) {
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", source], {
      cwd: projectRoot,
      encoding: "utf8",
    }).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`Could not determine the git last-modified date for ${source}.`);
    }
    lastmodBySource.set(source, date);
  }
  return lastmodBySource.get(source);
};
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map((routePath) =>
    `  <url><loc>https://www.seamoonind.com${routePath === "/" ? "/" : routePath}</loc><lastmod>${getLastmod(sourceByRoute(routePath))}</lastmod></url>`
  ),
  '</urlset>',
].join("\n");
await writeFile(path.join(distDirectory, "sitemap.xml"), `${sitemapXml}\n`, "utf8");
console.log(`Generated sitemap.xml with ${sitemapRoutes.length} indexable routes.`);
