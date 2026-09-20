import { useEffect } from "react";
import { getSeoForPath } from "../seo";

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
  useEffect(() => {
    const seo = getSeoForPath(path);
    document.title = seo.title;

    setMeta("name", "description", seo.description);
    setMeta("name", "robots", seo.noindex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Seamoon Industries");
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:image", seo.image);
    setMeta("property", "og:url", seo.canonical);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
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
  }, [path]);

  return null;
};

export default SEO;
