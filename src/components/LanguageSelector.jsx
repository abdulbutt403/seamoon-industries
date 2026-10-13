import { languages } from "../i18n/locales";
import { useI18n } from "../i18n/I18nContext";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useI18n();
  return (
    <div className="language-bar">
      <label htmlFor="site-language">{t("language.label")}</label>
      <select id="site-language" aria-label={t("language.label")} value={language}
        onChange={(event) => setLanguage(event.target.value)}>
        {languages.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
      </select>
    </div>
  );
};
export default LanguageSelector;
