import { Link } from "react-router-dom";
import { logoLight } from "../assets";
import { footerLinks } from "../constants";
import SocialLinks from "./SocialLinks";
import styles from "../style";
import { useI18n } from "../i18n/I18nContext";

const Footer = () => {
  const { t } = useI18n();
  const footerLinkKeys = { "/": "nav.home", "/dental-instruments": "footer.dentalInstruments", "/surgical-instruments": "footer.surgicalInstruments", "/oem-private-label": "footer.oemPrivateLabel", "/certifications": "nav.certifications", "/contact": "nav.contact" };
  return (
  <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logoLight}
          alt={t("brand.logoAlt")}
          className="brand-logo brand-logo--footer"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          {t("footer.tagline")}
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-end flex-wrap md:mt-0 mt-10">
        {footerLinks.map((group) => (
          <div
            key={group.title}
            className="flex flex-col ss:my-0 my-4 min-w-[190px]"
            style={{ textAlign: "end" }}
          >
            <h2 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {group.title === "Useful Links" ? t("footer.usefulLinks") : group.title}
            </h2>
            <ul className="list-none mt-4">
              {group.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                    index !== group.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  <Link to={link.link}>{t(footerLinkKeys[link.link] || link.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        {t("footer.copyright").replace("{year}", String(new Date().getFullYear()))} Seamoon Industries. {t("footer.rights")}
      </p>

      <SocialLinks className="md:mt-0 mt-6" />
    </div>
  </footer>
  );
};

export default Footer;
