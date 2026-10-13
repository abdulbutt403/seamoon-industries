// Vite discovers locale files automatically, so adding a language only requires
// adding its JSON file and its native label below.
const localeFiles = import.meta.glob("./locales/*.json", { eager: true, import: "default" });
export const messages = Object.fromEntries(
  Object.entries(localeFiles).map(([path, dictionary]) => [path.split("/").pop().replace(".json", ""), dictionary])
);
export const languages = [
  ["en", "English"], ["ur", "اردو"], ["de", "Deutsch"], ["fr", "Français"],
  ["es", "Español"], ["pt", "Português (Brasil)"], ["it", "Italiano"],
  ["ar", "العربية"], ["tr", "Türkçe"], ["ru", "Русский"], ["zh", "中文（简体）"],
  ["ja", "日本語"], ["ko", "한국어"], ["hi", "हिन्दी"], ["pl", "Polski"], ["nl", "Nederlands"],
].map(([code, name]) => ({ code, name }));
export const rtlLanguages = new Set(["ur", "ar"]);

