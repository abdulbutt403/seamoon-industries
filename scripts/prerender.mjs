import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const clientHtmlPath = path.join(projectRoot, "dist", "index.html");
const serverBuildDirectory = path.join(projectRoot, ".prerender");

const serverBuildFiles = await readdir(serverBuildDirectory);
const serverEntry = serverBuildFiles.find((file) =>
  /^entry-server\.(mjs|js)$/.test(file)
);

if (!serverEntry) {
  throw new Error("The server-render entry was not generated.");
}

const { render } = await import(
  pathToFileURL(path.join(serverBuildDirectory, serverEntry)).href
);

const appHtml = render();
const clientHtml = await readFile(clientHtmlPath, "utf8");
const rootPlaceholder = '<div id="root"></div>';

if (!clientHtml.includes(rootPlaceholder)) {
  throw new Error("Could not find the root element in the production HTML.");
}

const prerenderedHtml = clientHtml.replace(
  rootPlaceholder,
  `<div id="root">${appHtml}</div>`
);

await writeFile(clientHtmlPath, prerenderedHtml, "utf8");

console.log("Homepage HTML pre-rendered into dist/index.html");
