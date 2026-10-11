import styles from "../style";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import ProductCatalogue from "../components/ProductCatalogue";
import SEO from "../components/SEO";
import { useLocation } from "react-router-dom";

const DentalInstruments = () => {
  const { pathname } = useLocation();
  const categorySlug = pathname.split("/")[2];
  const categoryName = categorySlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
  <>
    <SEO path={pathname} />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Dental catalogue"
          title={categoryName ? `${categoryName} Dental Instruments` : "Dental Instruments Manufacturer & Exporter"}
          description="Dental instruments for extraction, restorative dentistry, diagnostics and orthodontics, plus complete procedure sets. Manufactured in Sialkot, Pakistan for export."
        />

        <section className="oem-content" aria-labelledby="dental-content-title" style={{ marginBottom: "48px" }}>
          <h2 id="dental-content-title" className={styles.heading2}>Dental instruments for multiple disciplines</h2>
          <div className={`${styles.paragraph} oem-content__body`}>
            <p>
              Seamoon Industries manufactures dental instruments in Sialkot, Pakistan for export.
              The catalogue is arranged around the work of dental practices and the procedures
              their teams perform. It includes instruments for extraction, restorative dentistry,
              diagnostics and orthodontics, alongside complete procedure sets. This range gives
              buyers a clear starting point for reviewing individual instruments and assembled
              kits. Product selection can be discussed with our export team, who can help identify
              the catalogue references relevant to an enquiry.
            </p>
            <h2>Extraction and restorative dentistry</h2>
            <p>
              Extraction instruments form one part of the dental range. Restorative dentistry is
              another, with instruments presented for restorative work and related procedures.
              The catalogue also includes diagnostic instruments used in examinations. Rather than
              assuming that one standard assortment suits every practice, buyers can refer to the
              listed product information and describe the procedures they need to support when
              requesting details. This helps keep a product enquiry focused on the intended use,
              selected references and whether a complete set is preferred.
            </p>
            <h2>Diagnostics, orthodontics and procedure sets</h2>
            <p>
              Orthodontic products include the Orthodontic Instrument Kit. For isolation and
              examination needs, the range also features a Rubber Dam Kit and a Three-Piece
              Examination Set. These named products sit alongside individual diagnostic and
              orthodontic instruments in the catalogue. Buyers may enquire about a named kit or
              about arranging a group of references for a particular procedure. The available
              product pages and catalogue provide the current item descriptions; the team can
              respond to questions about a particular reference or request.
            </p>
            <h2>Manufacturing and export enquiries</h2>
            <p>
              The manufacturing process described by Seamoon begins with material selection and
              continues through shaping, heat treatment, hand crafting, polishing and inspection.
              Stainless steel is used, and satin, mirror and titanium-coated finishes are listed.
              Dental instruments can also be discussed for OEM and private-label programmes, where
              custom design, branding and packaging are among the services presented by the
              company. These options can be considered for individual instruments and procedure
              sets. Contact the export team in Sialkot with the categories, kit names or catalogue
              references of interest to request product information and discuss an order enquiry.
            </p>
            <h2>Reviewing the dental catalogue</h2>
            <p>
              The product catalogue lets buyers browse available items by category and review
              their listed product descriptions. The dental videos on the site feature the
              Orthodontic Instrument Kit, Rubber Dam Kit and Three-Piece Examination Set. These
              are useful reference points for enquiries about procedure sets, alongside
              extraction, restorative, diagnostic and orthodontic instruments. Include the
              relevant product name or reference when contacting Seamoon. For an OEM enquiry,
              describe the required design, material, finish, branding and packaging options so
              the team can discuss the request with the right context.
            </p>
          </div>
        </section>

        <ProductCatalogue />
        <InternalPageLinks
          title="Continue exploring"
          links={[
            { to: "/", label: "Return to Seamoon Industries home" },
            { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
            { to: "/oem-private-label", label: "Explore OEM and private-label manufacturing" },
            { to: "/certifications", label: "Review our certifications and quality standards" },
          ]}
        />
      </div>
    </div>
  </>
  );
};

export default DentalInstruments;
