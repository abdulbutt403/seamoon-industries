import styles from "../style";
import InternalPageLinks from "../components/InternalPageLinks";
import OEMServices from "../components/OEMServices";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const OEMPrivateLabel = () => (
  <>
    <SEO path="/oem-private-label" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Manufactured for your market"
          title="OEM & Private Label Instrument Manufacturing"
          description="Private label and OEM manufacturing of dental and surgical instruments: custom design, material options, laser-etched branding and custom packaging."
        />

        <section className="oem-content" aria-labelledby="oem-content-title" style={{ marginBottom: "48px" }}>
          <h2 id="oem-content-title" className={styles.heading2}>Dental and surgical OEM manufacturing</h2>
          <div className={`${styles.paragraph} oem-content__body`}>
            <p>
              Seamoon Industries offers OEM and private-label services for dental and surgical
              instruments from its manufacturing base in Sialkot, Pakistan. Buyers can discuss a
              product requirement around the design, material, branding and packaging options
              already presented by the company. This page outlines those areas to help make an
              enquiry specific. Order quantity, delivery schedule and commercial terms should be
              raised during the enquiry and confirmed for each request.
            </p>
            <h2>Design and product requirements</h2>
            <p>
              Custom instrument design is one of the listed OEM services. Buyers can describe the
              dental or surgical category, share the product references they are considering and
              explain the design requirements they would like to discuss. The company’s service
              information covers adapting instrument geometry, including dimensions, tips and
              handles. A clear initial brief can identify the intended product, any reference
              material available and the market for which the item is being considered. Product
              details and feasibility can then be discussed with the Seamoon team.
            </p>
            <h2>Materials and manufacturing process</h2>
            <p>
              Stainless steel is used in the manufacturing process described on the site, with
              German and Japanese grades mentioned. The OEM service list also identifies German
              420/440 stainless steel, titanium-coated instruments and tungsten carbide insert
              options. The manufacturing stages presented include material selection, forging and
              shaping, heat treatment, hand crafting, polishing and inspection. Satin, mirror and
              titanium-coated finishes are listed. Buyers can identify their preferred material
              and finish in the enquiry so the team can discuss the applicable options.
            </p>
            <h2>Branding, packaging and next steps</h2>
            <p>
              Private-label support includes branding applied to instruments, with laser etching
              specifically listed, and packaging designed for the buyer’s brand. The company also
              lists custom packaging and surgical set assembly. An enquiry can identify whether it
              concerns a dental or surgical instrument, a single catalogue reference or a set, and
              which branding and packaging elements need consideration. Contact the export team in
              Sialkot to discuss the brief and obtain information for the specific request. MOQ,
              sample arrangements, lead times and payment terms should be confirmed with the team;
              these details can be included in the order discussion.
            </p>
            <h2>Preparing an OEM enquiry</h2>
            <p>
              A useful brief can name the product category, describe a custom design or identify
              the catalogue references under consideration. It can also note the requested steel
              or coating option, finish, laser-etched branding and packaging needs. If the enquiry
              concerns a set, list its intended instruments and presentation requirements. These
              details connect the product request with the manufacturing stages and OEM services
              described above. Share the brief with Seamoon Industries in Sialkot to discuss the
              available scope and the next information required for the project. Certificate and
              market documentation can also be raised when discussing instruments for export.
            </p>
          </div>
        </section>

        <OEMServices />
        <InternalPageLinks
          title="Explore products and standards"
          links={[
            { to: "/dental-instruments", label: "Browse dental instrument categories" },
            { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
            { to: "/certifications", label: "Review certifications and quality standards" },
            { to: "/contact", label: "Discuss your OEM requirements" },
          ]}
        />
      </div>
    </div>
  </>
);

export default OEMPrivateLabel;
