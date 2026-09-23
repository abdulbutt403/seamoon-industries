import { dentalInstruments, surgicalInstruments } from "./data/catalogues";

export const SITE_URL = "https://www.seamoonind.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/carousel/img1.jpg`;

const certifications = [
  "ISO 13485",
  "CE Mark (EU MDR)",
  "US FDA Registration",
  "ISO 9001:2015",
  "SIMAP",
  "SCCI",
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Seamoon Industries",
  url: SITE_URL,
  logo: `${SITE_URL}/hoobank.svg`,
  image: DEFAULT_OG_IMAGE,
  email: "info@seamoonind.com",
  telephone: "+92-52-3302249",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Small Industrial Estate, Fateh Garh Agency, Cheema Street",
    addressLocality: "Sialkot",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-52-3302249",
    contactType: "sales",
    email: "info@seamoonind.com",
    areaServed: "Worldwide",
  },
  sameAs: [],
  hasCertification: certifications.map((name) => ({
    "@type": "Certification",
    name,
  })),
  award: certifications,
};

const createItemListSchema = (name, path, items) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  url: `${SITE_URL}${path}`,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    description: item.description,
    image: `${SITE_URL}${item.image}`,
  })),
});

export const seoByPath = {
  "/": {
    title: "Dental & Surgical Instrument Manufacturer | Seamoon Industries",
    description:
      "Seamoon Industries manufactures and exports precision dental and surgical instruments from Sialkot, Pakistan, with OEM and private-label services.",
    schema: organizationSchema,
  },
  "/dental-instruments": {
    title: "Dental Instruments Manufacturer & Exporter | Seamoon Industries",
    description:
      "Explore dental extraction forceps, root elevators, restorative instruments, rubber dam clamps, and custom dental instrument sets.",
    schema: createItemListSchema(
      "Dental Instruments",
      "/dental-instruments",
      dentalInstruments
    ),
  },
  "/surgical-instruments": {
    title: "Surgical Instruments Manufacturer & Exporter | Seamoon Industries",
    description:
      "Explore precision surgical scissors, dressing forceps, needle holders, retractors, diagnostic instruments, and surgical accessories.",
    schema: createItemListSchema(
      "Surgical Instruments",
      "/surgical-instruments",
      surgicalInstruments
    ),
  },
  "/oem-private-label": {
    title: "OEM & Private Label Instrument Manufacturing | Seamoon Industries",
    description:
      "OEM and private-label dental and surgical instrument manufacturing with custom design, materials, branding, packaging, and surgical set assembly.",
  },
  "/certifications": {
    title: "Quality Certifications & Standards | Seamoon Industries",
    description:
      "Review Seamoon Industries quality standards, including ISO 13485, CE Mark EU MDR, US FDA registration, ISO 9001:2015, SIMAP, and SCCI.",
  },
  "/contact": {
    title: "Contact Seamoon Industries | Sialkot, Pakistan",
    description:
      "Contact Seamoon Industries in Sialkot for dental and surgical instrument enquiries, OEM manufacturing, private labeling, and export orders.",
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
];

export const getSeoForPath = (pathname) => {
  const normalizedPath =
    pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  const seo = seoByPath[normalizedPath] || seoByPath["/404"];

  return {
    ...seo,
    path: normalizedPath,
    canonical: `${SITE_URL}${normalizedPath === "/404" ? pathname : normalizedPath}`,
    image: seo.image || DEFAULT_OG_IMAGE,
  };
};
