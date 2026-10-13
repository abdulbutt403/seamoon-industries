import { Link, Redirect, useParams } from "react-router-dom";
import styles from "../style";
import GuideMarkdown from "../components/GuideMarkdown";
import SEO from "../components/SEO";
import { guideBySlug } from "../data/guides";
import { useI18n } from "../i18n/I18nContext";
import privateLabelGuide from "../content/guides/private-label-dental-instruments-pakistan.md?raw";
import steelGuide from "../content/guides/420-vs-440-stainless-steel-dental-surgical-instruments.md?raw";
import regulatoryGuide from "../content/guides/iso-13485-ce-eu-mdr-supplier-checklist.md?raw";

const guideContent = {
  "private-label-dental-instruments-pakistan": privateLabelGuide,
  "420-vs-440-stainless-steel-dental-surgical-instruments": steelGuide,
  "iso-13485-ce-eu-mdr-supplier-checklist": regulatoryGuide,
};

const GuidePage = () => {
  const { slug } = useParams();
  const guide = guideBySlug[slug];
  const { formatDate, t } = useI18n();
  if (!guide) return <Redirect to="/404" />;

  return (
    <>
      <SEO path={`/guides/${slug}`} />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <article className={`${styles.boxWidth} guide-page`}>
          <nav aria-label={t("guides.breadcrumbLabel")} className="font-poppins text-sm mb-5">
            <Link to="/">{t("nav.home")}</Link><span aria-hidden="true"> / </span>
            <Link to="/guides">{t("guides.nav")}</Link><span aria-hidden="true"> / </span>
            <span aria-current="page">{guide.title}</span>
          </nav>
          <header className="page-hero">
            <span>{t("guides.eyebrow")}</span>
            <h1>{guide.title}</h1>
            <p>{guide.excerpt}</p>
            <p className="guide-byline">
              {t("guides.byline")} · {t("guides.lastUpdated")} <time dateTime="2026-10-13">{formatDate(new Date("2026-10-13T12:00:00Z"), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
            </p>
          </header>
          <GuideMarkdown source={guideContent[slug]} />
          <section className="my-12 p-6 rounded-[10px] bg-primaryNavy text-white" aria-labelledby="guide-quote-title">
            <h2 id="guide-quote-title" className="font-poppins font-semibold text-2xl mb-3">{t("guides.quoteHeading")}</h2>
            <p className="mb-5">{t("guides.quoteDescription")}</p>
            <Link to="/contact" className="inline-block py-3 px-5 font-poppins font-medium text-primary bg-blue-gradient rounded-[10px]">{t("guides.requestQuote")}</Link>
          </section>
          <p className="my-6"><Link to="/guides">← {t("guides.back")}</Link></p>
          <section className="oem-faq mb-12" aria-labelledby="guide-faq-title">
            <h2 id="guide-faq-title" className="font-poppins font-semibold text-3xl mb-6">{t("guides.faqTitle")}</h2>
            <dl className="faq-list">
              {guide.faqs.map(({ question, answer }) => (
                <div key={question} className="faq-item">
                  <dt className="faq-item__question">{question}</dt>
                  <dd className="faq-item__answer">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </div>
    </>
  );
};

export default GuidePage;
