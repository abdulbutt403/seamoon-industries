import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "../style";
import Certifications from "../components/Certifications";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { certificationFaqs as faqs } from "../data/faqs";

const certificationDetails = [
  {
    name: "ISO 13485:2016",
    id: "iso-13485",
    body: "International Organization for Standardization (ISO)",
    scope:
      "Quality management system for the design, manufacture, and supply of medical devices and related services.",
    relevance:
      "Covers our full production process for dental and surgical instruments — from raw material intake through finished-goods inspection and post-market surveillance. Audited annually by an accredited third-party certification body.",
  },
  {
    name: "CE Mark — EU MDR (2017/745)",
    id: "ce-mark",
    body: "Notified Body under EU Medical Device Regulation",
    scope:
      "European conformity marking for applicable Class I and Class IIa reusable surgical and dental instruments.",
    relevance:
      "Instruments exported to the European Economic Area carry CE marking supported by a technical file, declaration of conformity, and IFU documentation prepared to EU MDR requirements.",
  },
  {
    name: "US FDA Establishment Registration",
    id: "us-fda",
    body: "U.S. Food and Drug Administration",
    scope:
      "Establishment registration and device listing for surgical and dental instruments exported to the United States market.",
    relevance:
      "Enables direct export of registered instrument categories to US-based distributors and hospital procurement programmes without additional import barriers.",
  },
  {
    name: "ISO 9001:2015",
    id: "iso-9001",
    body: "International Organization for Standardization (ISO)",
    scope:
      "General quality management system standard covering consistent process control and continual improvement across all operations.",
    relevance:
      "Underpins our manufacturing, supplier management, and customer-service processes. Provides the quality framework that supports our more specific ISO 13485 medical-device certification.",
  },
  {
    name: "SIMAP",
    id: "simap",
    body: "Surgical Instruments Manufacturers Association of Pakistan",
    scope:
      "Industry association representing Pakistan's surgical instrument manufacturing sector.",
    relevance:
      "Membership confirms our standing as a registered manufacturer within Sialkot's established instrument industry and provides access to sector-level export and regulatory support.",
  },
  {
    name: "SCCI",
    id: "scci",
    body: "Sialkot Chamber of Commerce and Industry",
    scope:
      "Regional chamber of commerce representing businesses operating in Sialkot.",
    relevance:
      "Affiliation supports export documentation, certificate-of-origin processing, and trade facilitation for international shipments.",
  },
];

const CertificationsPage = () => {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (!target) return;
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
      target.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    const revealItems = page.querySelectorAll(
      ".page-hero, .certification-details, .oem-faq, .internal-links"
    );
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    page.classList.add("certification-page--enhanced");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO path="/certifications" />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
          <div className="certification-page" ref={pageRef}>
            <PageHero
              eyebrow="Quality and compliance"
              title="Certifications & Quality Standards"
              description="Our quality systems and industry registrations support reliable manufacturing, traceable processes, and international supply to regulated markets in Europe, North America, and beyond."
            />

            <Certifications />

            <section className="certification-details" aria-labelledby="certification-details-title">
              <h2 id="certification-details-title">Standards Supporting Our Manufacturing</h2>
              <dl>
                {certificationDetails.map(({ name, id, body, scope, relevance }) => (
                  <div key={name} id={id} className="certification-detail-row" tabIndex="-1">
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
      </div>
    </>
  );
};

export default CertificationsPage;
