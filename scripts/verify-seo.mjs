import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.resolve(projectRoot, process.argv[2] || "dist");
const routes = [
  "/",
  "/dental-instruments",
  "/surgical-instruments",
  "/oem-private-label",
  "/certifications",
  "/contact",
  "/cart",
];

const decodeHtml = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const matchOne = (html, expression, label, route) => {
  const value = html.match(expression)?.[1];
  if (!value) throw new Error(`Missing ${label} in raw HTML for ${route}`);
  return decodeHtml(value);
};

const readMeta = (html, attribute, key, route) => {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(
    `<meta\\s+${attribute}="${escapedKey}"\\s+content="([^"]*)"\\s*\\/?>`,
    "i"
  );
  return matchOne(html, expression, `${key} meta tag`, route);
};

const readStructuredData = (html, route) => {
  const json = html.match(
    /<script\s+id="page-structured-data"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i
  )?.[1];
  if (!json) throw new Error(`Missing JSON-LD in raw HTML for ${route}`);
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error(`Invalid JSON-LD in ${route}: ${error.message}`);
  }
};

const results = [];

for (const route of routes) {
  const routeDirectory = route === "/" ? "" : route.slice(1);
  const htmlPath = path.join(distDirectory, routeDirectory, "index.html");
  const html = await readFile(htmlPath, "utf8");
  const structuredData = readStructuredData(html, route);
  const schemaTypes = structuredData["@graph"]?.map(({ "@type": type }) => type) || [];
  if (structuredData["@context"] !== "https://schema.org") {
    throw new Error(`Missing Schema.org context for ${route}`);
  }
  if (!schemaTypes.includes("Organization")) {
    throw new Error(`Missing Organization schema for ${route}`);
  }
  if (route === "/" && !schemaTypes.includes("WebSite")) {
    throw new Error("Missing WebSite schema on homepage");
  }
  if (route !== "/" && !schemaTypes.includes("BreadcrumbList")) {
    throw new Error(`Missing BreadcrumbList schema for ${route}`);
  }
  const shouldHaveFaq = ["/oem-private-label", "/certifications"].includes(route);
  if (schemaTypes.includes("FAQPage") !== shouldHaveFaq) {
    throw new Error(`Unexpected FAQPage schema presence for ${route}`);
  }
  const title = matchOne(html, /<title>([\s\S]*?)<\/title>/i, "title", route);
  const description = readMeta(html, "name", "description", route);
  const canonical = matchOne(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i,
    "canonical", route
  );
  const expectedCanonical = `https://www.seamoonind.com${route === "/" ? "/" : route}`;

  if (canonical !== expectedCanonical) {
    throw new Error(`Unexpected canonical for ${route}: ${canonical}`);
  }
  if (readMeta(html, "property", "og:title", route) !== title) {
    throw new Error(`og:title does not match title for ${route}`);
  }
  if (readMeta(html, "property", "og:description", route) !== description) {
    throw new Error(`og:description does not match description for ${route}`);
  }
  if (readMeta(html, "property", "og:url", route) !== canonical) {
    throw new Error(`og:url does not match canonical for ${route}`);
  }
  if (readMeta(html, "name", "twitter:title", route) !== title) {
    throw new Error(`twitter:title does not match title for ${route}`);
  }
  if (readMeta(html, "name", "twitter:description", route) !== description) {
    throw new Error(`twitter:description does not match description for ${route}`);
  }

  results.push({ route, title, description, canonical, schemaTypes });
}

if (new Set(results.map(({ title }) => title)).size !== results.length) {
  throw new Error("Expected a unique title for each route.");
}
if (new Set(results.map(({ description }) => description)).size !== results.length) {
  throw new Error("Expected a unique description for each route.");
}

for (const result of results) {
  console.log(`\n${result.route}`);
  console.log(`  title: ${result.title}`);
  console.log(`  description: ${result.description}`);
  console.log(`  canonical: ${result.canonical}`);
  console.log(`  JSON-LD: ${result.schemaTypes.join(", ")}`);
}
console.log("\nSEO metadata and JSON-LD verified for all seven prerendered routes.");
