export const SITE_URL = "https://seamoonind.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/carousel/img1-light.png`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Seamoon Industries",
  url: SITE_URL,
  logo: `${SITE_URL}/sm-logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Small Industrial Estate, Fateh Garh Agency, Cheema Street",
    addressLocality: "Sialkot",
    addressCountry: "PK",
  },
  telephone: "+92-52-3302249",
  email: "info@seamoonind.com",
  sameAs: [],
};

const breadcrumbSchema = (path, label) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: label,
      item: `${SITE_URL}${path}`,
    },
  ],
});

export const seoByPath = {
  "/": {
    title: "Dental Instruments Manufacturer in Sialkot, Pakistan | Seamoon",
    description:
      "Seamoon Industries manufactures and exports precision dental and surgical instruments from Sialkot, Pakistan, with OEM and private-label services.",
    schema: organizationSchema,
  },
  "/dental-instruments": {
    title: "Dental Instruments Manufacturer & Exporter | Seamoon Industries",
    description:
      "Dental instruments for extraction, restorative dentistry, diagnostics and orthodontics, plus complete procedure sets. Manufactured in Sialkot, Pakistan for export.",
    schema: breadcrumbSchema("/dental-instruments", "Dental Instruments"),
  },
  "/surgical-instruments": {
    title: "Surgical Instruments Manufacturer Sialkot | Seamoon Industries",
    description:
      "Reusable surgical instruments for general, vascular, diagnostic and orthopaedic procedures. Manufactured in Sialkot, Pakistan for export and OEM programmes.",
    schema: breadcrumbSchema("/surgical-instruments", "Surgical Instruments"),
  },
  "/oem-private-label": {
    title: "OEM & Private Label Dental and Surgical Instruments | Seamoon",
    description:
      "Private label and OEM manufacturing of dental and surgical instruments: custom design, material options, laser-etched branding and custom packaging.",
    schema: breadcrumbSchema("/oem-private-label", "OEM & Private Label"),
  },
  "/certifications": {
    title: "Certifications: ISO 13485, CE, FDA Registration | Seamoon",
    description:
      "Seamoon Industries quality standards and certifications: ISO 13485, ISO 9001:2015, CE Mark (EU MDR), US FDA registration, SIMAP and SCCI.",
    schema: breadcrumbSchema("/certifications", "Certifications"),
  },
  "/contact": {
    title: "Contact Seamoon Industries | Dental & Surgical Export, Sialkot",
    description:
      "Contact the Seamoon Industries export team in Sialkot, Pakistan for quotes, catalogues and OEM enquiries. WhatsApp, phone and email.",
    schema: breadcrumbSchema("/contact", "Contact"),
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
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  const dentalCategory = normalizedPath.startsWith("/dental-instruments/")
    ? normalizedPath.slice("/dental-instruments/".length)
    : "";
  const categoryName = dentalCategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const seo = dentalCategory
    ? {
        title: `${categoryName} | Seamoon Industries`,
        description: `Dental instruments in the ${categoryName.toLowerCase()} category, manufactured in Sialkot, Pakistan for export.`,
        schema: breadcrumbSchema(
          normalizedPath,
          `${categoryName} Dental Instruments`
        ),
      }
    : seoByPath[normalizedPath] || seoByPath["/404"];

  return {
    ...seo,
    path: normalizedPath,
    canonical: `${SITE_URL}${normalizedPath === "/404" ? pathname : normalizedPath}`,
    image: seo.image || DEFAULT_OG_IMAGE,
  };
};
