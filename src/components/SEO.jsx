import { useEffect } from "react";
import { getSeoForPath, verificationTokens } from "../seo";
import { useI18n } from "../i18n/I18nContext";

const setMeta = (attribute, key, content) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const SEO = ({ path }) => {
  const { language, t } = useI18n();
  useEffect(() => {
    const seo = getSeoForPath(path);
    const suffixByPath = {
      "/": "home", "/dental-instruments": "dental", "/surgical-instruments": "surgical",
      "/oem-private-label": "oem", "/certifications": "certifications", "/contact": "contact", "/cart": "cart",
      "/about": "about",
    };
    const normalizedPath = path.replace(/\/$/, "") || "/";
    const isGuidePath = normalizedPath === "/guides" || normalizedPath.startsWith("/guides/");
    const suffix = suffixByPath[normalizedPath]
      || (normalizedPath.startsWith("/dental-instruments/") ? "dental" : "home");
    const title = isGuidePath ? seo.title : t(`seo.${suffix}.title`);
    const description = isGuidePath ? seo.description : t(`seo.${suffix}.description`);
    document.title = title === `seo.${suffix}.title` ? seo.title : title;

    const localizedDescription = description === `seo.${suffix}.description` ? seo.description : description;
    setMeta("name", "description", localizedDescription);
    setMeta("name", "robots", seo.noindex ? "noindex, nofollow" : "index, follow");
    [
      ["google-site-verification", verificationTokens.google],
      ["msvalidate.01", verificationTokens.bing],
    ].forEach(([name, content]) => {
      const existing = document.head.querySelector(`meta[name="${name}"]`);
      if (!content) {
        existing?.remove();
      } else {
        setMeta("name", name, content);
      }
    });
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Seamoon Industries");
    setMeta("property", "og:title", document.title);
    setMeta("property", "og:description", localizedDescription);
    setMeta("property", "og:image", seo.image);
    setMeta("property", "og:url", seo.canonical);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", document.title);
    setMeta("name", "twitter:description", localizedDescription);
    setMeta("name", "twitter:image", seo.image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.canonical);

    const existingSchema = document.getElementById("page-structured-data");
    if (existingSchema) existingSchema.remove();

    if (seo.schema) {
      const schema = document.createElement("script");
      schema.id = "page-structured-data";
      schema.type = "application/ld+json";
      schema.textContent = JSON.stringify(seo.schema);
      document.head.appendChild(schema);
    }
  }, [path, language, t]);

  return null;
};

export default SEO;
