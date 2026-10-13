import { Link } from "react-router-dom";
import styles from "../style";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { guides } from "../data/guides";
import { useI18n } from "../i18n/I18nContext";

const GuidesPage = () => {
  const { formatDate, t } = useI18n();
  return (
    <>
    <SEO path="/guides" />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
        <nav aria-label={t("guides.breadcrumbLabel")} className="font-poppins text-sm mb-5">
          <Link to="/">{t("nav.home")}</Link><span aria-hidden="true"> / </span><span aria-current="page">{t("guides.nav")}</span>
        </nav>
        <PageHero
          eyebrow={t("guides.eyebrow")}
          title={t("guides.indexTitle")}
          description={t("guides.indexDescription")}
        />
        <p className="font-poppins text-sm mb-7">{t("guides.byline")} · {t("guides.lastUpdated")} <time dateTime="2026-10-13">{formatDate(new Date("2026-10-13T12:00:00Z"), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></p>
        <section className="internal-links" aria-labelledby="guides-list-title">
          <p id="guides-list-title">{t("guides.listHeading")}</p>
          <div className="internal-links__list">
            {guides.map((guide) => (
              <Link key={guide.slug} to={`/guides/${guide.slug}`}>
                <span>
                  <strong>{guide.title}</strong>
                  <br />
                  <span>{guide.excerpt}</span>
                </span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13M14 7l5 5-5 5" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
        <section className="my-12 p-6 rounded-[10px] bg-primaryNavy text-white" aria-labelledby="guides-quote-title">
          <h2 id="guides-quote-title" className="font-poppins font-semibold text-2xl mb-3">{t("guides.quoteHeading")}</h2>
          <p className="mb-5">{t("guides.quoteDescription")}</p>
          <Link to="/contact" className="inline-block py-3 px-5 font-poppins font-medium text-primary bg-blue-gradient rounded-[10px]">{t("guides.requestQuote")}</Link>
        </section>
        </div>
      </div>
    </>
  );
};

export default GuidesPage;
