import { Link } from "react-router-dom";
import styles from "../style";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import SocialLinks from "../components/SocialLinks";
import { SITE_BRAND } from "../constants";
import { useI18n } from "../i18n/I18nContext";

const AboutPage = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO path="/about" />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
          <nav aria-label={t("guides.breadcrumbLabel")} className="font-poppins text-sm mb-5">
            <Link to="/">{t("nav.home")}</Link><span aria-hidden="true"> / </span>
            <span aria-current="page">{t("about.nav")}</span>
          </nav>
          <PageHero
            eyebrow={t("about.eyebrow")}
            title={SITE_BRAND.name}
            description={t("about.intro")}
          />

          <section className="oem-content" aria-labelledby="about-company-title">
            <h2 id="about-company-title" className={styles.heading2} style={{ marginBottom: "1.5rem" }}>
              {t("about.companyHeading")}
            </h2>
            <div className={`${styles.paragraph} oem-content__body`}>
              <p>{t("about.companyDescription")}</p>
              <h3>{t("about.oemHeading")}</h3>
              <p>{t("about.oemDescription")}</p>
              <h3>{t("about.processHeading")}</h3>
              <p>{t("about.processDescription")}</p>
              <ul>
                <li>{t("about.foundingYear")}</li>
                <li>{t("about.team")}</li>
                <li>{t("about.factorySize")}</li>
              </ul>
            </div>
          </section>

          <section className="oem-content" aria-labelledby="about-contact-title">
            <h2 id="about-contact-title" className={styles.heading2}>{t("about.contactHeading")}</h2>
            <address className={`${styles.paragraph} not-italic`}>
              {SITE_BRAND.address.fullAddress}<br />
              <a href={`tel:${SITE_BRAND.telephone}`}>{SITE_BRAND.telephone}</a><br />
              <a href={`https://wa.me/${SITE_BRAND.whatsapp.replace(/\D/g, "")}`}>{SITE_BRAND.whatsapp} (WhatsApp)</a><br />
              <a href={`mailto:${SITE_BRAND.email}`}>{SITE_BRAND.email}</a><br />
              <a href={SITE_BRAND.website}>{SITE_BRAND.website.replace(/^https?:\/\//, "")}</a>
            </address>
            <SocialLinks className="mt-5" />
          </section>

          <InternalPageLinks
            title={t("about.exploreHeading")}
            links={[
              { to: "/dental-instruments", label: t("about.dentalLink") },
              { to: "/surgical-instruments", label: t("about.surgicalLink") },
              { to: "/oem-private-label", label: t("about.oemLink") },
              { to: "/certifications", label: t("about.certificationsLink") },
              { to: "/contact", label: t("about.contactLink") },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
