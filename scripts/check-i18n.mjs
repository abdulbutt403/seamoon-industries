import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const localeDir = path.join(root, "src", "i18n", "locales");
const sourceRoots = ["src"];
const walk = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true }))
  .map(async (entry) => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : /\.(jsx|tsx|js|ts)$/.test(entry.name) ? [path.join(directory, entry.name)] : []))).flat();

const locales = {};
for (const file of await readdir(localeDir)) {
  if (file.endsWith(".json")) locales[file.replace(/\.json$/, "")] = JSON.parse(await readFile(path.join(localeDir, file), "utf8"));
}
const base = locales.en;
let errors = 0;
for (const [locale, messages] of Object.entries(locales)) {
  const missing = Object.keys(base).filter((key) => !(key in messages) || !String(messages[key]).trim());
  if (missing.length) {
    errors += missing.length;
    console.error(`[${locale}] missing/empty (${missing.length}): ${missing.join(", ")}`);
  }
}

const files = (await Promise.all(sourceRoots.map((directory) => walk(path.join(root, directory))))).flat();
const visiblePatterns = [
  />\s*[^<{\n]*[A-Za-z][^<{\n]*\s*</g,
  /(?:placeholder|alt|title|aria-label)\s*=\s*["'][^"']*[A-Za-z][^"']*["']/g,
  /(?:alert|confirm|prompt)\(\s*["'`][^"'`]*[A-Za-z][^"'`]*["'`]/g,
];
for (const file of files) {
  const source = await readFile(file, "utf8");
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/^\s*(\/\/|\*|\{|\/\*)/.test(line)) return;
    if (visiblePatterns.some((pattern) => { pattern.lastIndex = 0; return pattern.test(line); })) {
      errors++;
      console.error(`[hardcoded] ${path.relative(root, file)}:${index + 1}: ${line.trim()}`);
    }
  });
}

const keyPattern = /\bt\(\s*["']([^"']+)["']\s*\)/g;
for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(keyPattern)) {
    if (!(match[1] in base)) {
      errors++;
      console.error(`[unknown key] ${path.relative(root, file)}: ${match[1]}`);
    }
  }
}
if (errors) {
  console.error(`i18n check failed with ${errors} issue(s).`);
  process.exitCode = 1;
} else {
  console.log(`i18n check passed: ${Object.keys(base).length} keys across ${Object.keys(locales).length} locales; no detected hardcoded visible strings.`);
}
