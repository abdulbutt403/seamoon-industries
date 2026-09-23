import { useEffect } from "react";
import styles from "../style";
import Certifications from "../components/Certifications";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const certificationDetails = [
  {
    name: "ISO 13485:2016",
    body: "International Organization for Standardization (ISO)",
    scope:
      "Quality management system for the design, manufacture, and supply of medical devices and related services.",
    relevance:
      "Covers our full production process for dental and surgical instruments — from raw material intake through finished-goods inspection and post-market surveillance. Audited annually by an accredited third-party certification body.",
  },
  {
    name: "CE Mark — EU MDR (2017/745)",
    body: "Notified Body under EU Medical Device Regulation",
    scope:
      "European conformity marking for applicable Class I and Class IIa reusable surgical and dental instruments.",
    relevance:
      "Instruments exported to the European Economic Area carry CE marking supported by a technical file, declaration of conformity, and IFU documentation prepared to EU MDR requirements.",
  },
  {
    name: "US FDA Establishment Registration",
    body: "U.S. Food and Drug Administration",
    scope:
      "Establishment registration and device listing for surgical and dental instruments exported to the United States market.",
    relevance:
      "Enables direct export of registered instrument categories to US-based distributors and hospital procurement programmes without additional import barriers.",
  },
  {
    name: "ISO 9001:2015",
    body: "International Organization for Standardization (ISO)",
    scope:
      "General quality management system standard covering consistent process control and continual improvement across all operations.",
    relevance:
      "Underpins our manufacturing, supplier management, and customer-service processes. Provides the quality framework that supports our more specific ISO 13485 medical-device certification.",
  },
  {
    name: "SIMAP",
    body: "Surgical Instruments Manufacturers Association of Pakistan",
    scope:
      "Industry association representing Pakistan's surgical instrument manufacturing sector.",
    relevance:
      "Membership confirms our standing as a registered manufacturer within Sialkot's established instrument industry and provides access to sector-level export and regulatory support.",
  },
  {
    name: "SCCI",
    body: "Sialkot Chamber of Commerce and Industry",
    scope:
      "Regional chamber of commerce representing businesses operating in Sialkot.",
    relevance:
      "Affiliation supports export documentation, certificate-of-origin processing, and trade facilitation for international shipments.",
  },
];

const faqs = [
  {
    question: "Are your instruments CE marked for the European market?",
    answer:
      "Yes. Applicable instrument categories carry CE marking under EU MDR 2017/745. We can supply declarations of conformity, technical file summaries, and IFU documentation to support your own regulatory requirements.",
  },
  {
    question: "Are you FDA registered for exports to the United States?",
    answer:
      "Yes. Seamoon Industries holds US FDA establishment registration and device listings for our surgical and dental instrument categories, enabling direct export to US distributors and healthcare procurement programmes.",
  },
  {
    question: "What quality-management standard covers your production?",
    answer:
      "Our primary quality-management standard is ISO 13485:2016, which is specific to medical device manufacturing. This is supported by ISO 9001:2015 for general process quality. Both are audited by accredited third-party certification bodies.",
  },
  {
    question: "Can you provide batch traceability records?",
    answer:
      "Yes. Under our ISO 13485 system, full batch traceability is maintained from raw material lot through to finished goods and shipping. Records are available on request for quality audits or regulatory submissions.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const CertificationsPage = () => {
  useEffect(() => {
    const existing = document.getElementById("cert-faq-structured-data");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "cert-faq-structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => document.getElementById("cert-faq-structured-data")?.remove();
  }, []);

  return (
    <>
      <SEO path="/certifications" />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
          <PageHero
            eyebrow="Quality and compliance"
            title="Certifications & Quality Standards"
            description="Our quality systems and industry registrations support reliable manufacturing, traceable processes, and international supply to regulated markets in Europe, North America, and beyond."
          />

          <Certifications />

          <section className="certification-details" aria-labelledby="certification-details-title">
            <h2 id="certification-details-title">Standards Supporting Our Manufacturing</h2>
            <dl>
              {certificationDetails.map(({ name, body, scope, relevance }) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>
                    <strong>Issuing body:</strong> {body}<br />
                    <strong>Scope:</strong> {scope}<br />
                    <strong>What it means for buyers:</strong> {relevance}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="oem-faq" aria-labelledby="cert-faq-title" style={{ marginBottom: "64px" }}>
            <h2 id="cert-faq-title" className={styles.heading2} style={{ marginBottom: "2rem" }}>
              Certification FAQs
            </h2>
            <dl className="faq-list">
              {faqs.map(({ question, answer }) => (
                <div key={question} className="faq-item">
                  <dt className="faq-item__question">{question}</dt>
                  <dd className="faq-item__answer">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <InternalPageLinks
            title="Explore our capabilities"
            links={[
              { to: "/", label: "Return to Seamoon Industries home" },
              { to: "/dental-instruments", label: "Browse dental instrument categories" },
              { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
              { to: "/oem-private-label", label: "Explore OEM and private-label services" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default CertificationsPage;
