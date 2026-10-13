import { socialMedia } from "./constants";
import { SITE_CONTACT } from "./constants/contact";
import { certificationFaqs, oemFaqs, toFaqPageSchema } from "./data/faqs";
import { guides, guideBySlug } from "./data/guides";

export const SITE_URL = "https://www.seamoonind.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/carousel/img1.jpg`;
export const verificationTokens = {
  google: import.meta.env.VITE_GSC_TOKEN || "",
  bing: import.meta.env.VITE_BING_TOKEN || "",
};

const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Seamoon Industries",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/sm-logo.png`,
  email: SITE_CONTACT.email,
  telephone: SITE_CONTACT.telephone,
  address: {
    "@type": "PostalAddress",
    ...SITE_CONTACT.address,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONTACT.telephone,
    email: SITE_CONTACT.email,
    contactType: "Export inquiries",
    availableLanguage: ["English", "Urdu"],
  },
  sameAs: socialMedia.map(({ link }) => link),
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Seamoon Industries",
  url: `${SITE_URL}/`,
  publisher: { "@id": organizationSchema["@id"] },
};

const pageNames = {
  "/dental-instruments": "Dental Instruments",
  "/surgical-instruments": "Surgical Instruments",
  "/oem-private-label": "OEM & Private Label",
  "/certifications": "Certifications",
  "/contact": "Contact",
  "/cart": "Cart",
  "/guides": "Guides",
  "/404": "Page Not Found",
};

const createBreadcrumbSchema = (path, label) => {
  const items = [{ name: "Home", path: "/" }];
  if (path.startsWith("/dental-instruments/")) {
    items.push({ name: "Dental Instruments", path: "/dental-instruments" });
  }
  if (path.startsWith("/guides/")) {
    items.push({ name: "Guides", path: "/guides" });
  }
  items.push({ name: label, path });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path: itemPath }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${itemPath === "/" ? "/" : itemPath}`,
    })),
  };
};

const withStructuredData = (nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

const seoByPath = {
  "/": {
    title: "Dental & Surgical Instrument Manufacturer | Seamoon",
    description:
      "Seamoon Industries manufactures and exports dental and surgical instruments from Sialkot, Pakistan, with OEM and private-label services for buyers worldwide.",
  },
  "/dental-instruments": {
    title: "Dental Instruments Manufacturer & Exporter | Seamoon",
    description:
      "Explore dental extraction forceps, root elevators, restorative and diagnostic instruments, rubber dam clamps, and sets manufactured in Sialkot for export.",
  },
  "/surgical-instruments": {
    title: "Surgical Instruments Manufacturer & Exporter | Seamoon",
    description:
      "Explore precision surgical scissors, dressing forceps, needle holders, retractors, diagnostic instruments, and accessories manufactured in Sialkot for export.",
  },
  "/oem-private-label": {
    title: "OEM & Private Label Dental/Surgical Instruments | Seamoon",
    description:
      "OEM and private-label dental and surgical instrument manufacturing in Sialkot, with custom design, material options, branding, packaging and set assembly.",
  },
  "/certifications": {
    title: "ISO 13485, CE & FDA Certifications | Seamoon Industries",
    description:
      "Review Seamoon Industries quality standards and certifications, including ISO 13485, CE Mark (EU MDR), US FDA registration, ISO 9001:2015, SIMAP and SCCI.",
  },
  "/contact": {
    title: "Contact Seamoon Industries | Export Inquiries, Sialkot",
    description:
      "Contact Seamoon Industries in Sialkot, Pakistan for dental and surgical instrument export inquiries, OEM manufacturing, private labeling and catalogue requests.",
  },
  "/cart": {
    title: "Product Inquiry Cart | Seamoon Industries",
    description: "Review selected dental instruments and send a product inquiry to Seamoon Industries.",
    noindex: true,
  },
  "/guides": {
    title: "Dental & Surgical Instrument Buyer Guides | Seamoon Industries",
    description:
      "Practical buyer guides to private-label dental instruments, stainless steel selection, and supplier quality and regulatory documents.",
  },
  "/404": {
    title: "Page Not Found | Seamoon Industries",
    description: "The requested page could not be found.",
    noindex: true,
  },
};

export const prerenderPaths = [
  "/",
  "/dental-instruments",
  "/surgical-instruments",
  "/oem-private-label",
  "/certifications",
  "/contact",
  "/cart",
  "/guides",
  ...guides.map(({ slug }) => `/guides/${slug}`),
];

export const getSeoForPath = (pathname) => {
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  const isDentalCategory = normalizedPath.startsWith("/dental-instruments/");
  const guide = normalizedPath.startsWith("/guides/")
    ? guideBySlug[normalizedPath.slice("/guides/".length)]
    : null;
  const categoryName = isDentalCategory
    ? normalizedPath
        .replace("/dental-instruments/", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";
  const seo = guide
    ? { title: `${guide.title} | Seamoon Industries`, description: guide.description }
    : isDentalCategory
    ? {
        title: `${categoryName} | Seamoon Industries`,
        description: `Browse ${categoryName.toLowerCase()} manufactured by Seamoon Industries for professional dental use and international supply.`,
      }
    : seoByPath[normalizedPath] || seoByPath["/404"];

  const nodes = [organizationSchema];
  if (normalizedPath === "/") {
    nodes.push(websiteSchema);
  } else {
    nodes.push(createBreadcrumbSchema(
      guide || isDentalCategory ? normalizedPath : (seoByPath[normalizedPath] ? normalizedPath : "/404"),
      guide?.title || (isDentalCategory ? categoryName : (pageNames[normalizedPath] || "Page Not Found"))
    ));
    if (guide) nodes.push(toFaqPageSchema(guide.faqs));
    if (normalizedPath === "/oem-private-label") nodes.push(toFaqPageSchema(oemFaqs));
    if (normalizedPath === "/certifications") nodes.push(toFaqPageSchema(certificationFaqs));
  }

  return {
    ...seo,
    schema: withStructuredData(nodes),
    path: normalizedPath,
    canonical: `${SITE_URL}${normalizedPath === "/404" ? pathname : normalizedPath}`,
    image: seo.image || DEFAULT_OG_IMAGE,
  };
};
