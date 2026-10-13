import { logo } from "../assets";
import SocialLinks from "./SocialLinks";
import { useI18n } from "../i18n/I18nContext";
import { SITE_CONTACT } from "../constants/contact";
const Contact = () => {
  const { t } = useI18n();
  return (
    <div className="background" id="contactform">
    <div className="container">
      <div className="screen">
        <div className="screen-header">
          <div className="screen-header-left">
            <div className="screen-header-button close"></div>
            <div className="screen-header-button maximize"></div>
            <div className="screen-header-button minimize"></div>
          </div>
          <div className="screen-header-right">
            <div className="screen-header-ellipsis"></div>
            <div className="screen-header-ellipsis"></div>
            <div className="screen-header-ellipsis"></div>
          </div>
        </div>
        <div className="screen-body">
          <div className="screen-body-item left">
            <div className="app-title">
              <img src={logo} alt={t("brand.logoAlt")} className="brand-logo brand-logo--contact" />
            </div>
            <div style={{marginTop: 40, color:'#fff'}}>
            <h2 style={{marginBottom: 10, color:'#fff'}}>SALMAN ARSHAD <br/> ({t("contact.ceo")})</h2>

            <h5 style={{fontStyle: 'italic', fontWeight: 400, fontSize: 13}}>Sialkot, Small Industrial Estate</h5>
            <h5 style={{fontStyle: 'italic', fontWeight: 400, fontSize: 13, marginBottom: 5}}>Fateh Garh Agency, Cheema Street</h5>

            <div className="app-contact">{t("contact.whatsapp")}: {SITE_CONTACT.whatsapp}</div>
            <div className="app-contact">{t("contact.tel")}: {SITE_CONTACT.telephone}</div>
            <div className="app-contact">{t("contact.email")}: {SITE_CONTACT.email}</div>
            <div className="app-contact">{t("contact.gmail")}: {SITE_CONTACT.gmail}</div>
            <div className="app-contact">{t("contact.web")}: {SITE_CONTACT.website}</div>
            <SocialLinks className="contact-social-links" />
            </div>
          </div>
          <div className="screen-body-item">
            <form className="app-form" onSubmit={(event) => event.preventDefault()}>
              <div className="app-form-group">
                <label className="sr-only" htmlFor="contact-name">{t("form.name")}</label>
                <input id="contact-name" name="name" className="app-form-control" placeholder={t("form.name").toUpperCase()}/>
              </div>
              <div className="app-form-group">
                <label className="sr-only" htmlFor="contact-email">{t("form.email")}</label>
                <input id="contact-email" name="email" type="email" className="app-form-control" placeholder={t("form.email").toUpperCase()}/>
              </div>
              <div className="app-form-group message">
                <label className="sr-only" htmlFor="contact-message">{t("form.message")}</label>
                <textarea id="contact-message" name="message" className="app-form-control" placeholder={t("form.message").toUpperCase()}/>
              </div>
              <div className="app-form-group buttons">
                <button type="reset" style={{boxShadow: '0 0 5px 0 rgba(255,255,255,0.5)', color: '#fff', width: 100, marginRight: 20}} className="py-2 px-2 font-poppins font-medium text-[18px] text-primary rounded-[10px] outline-none mt-10 text-white">{t("form.cancel").toUpperCase()}</button>
                <button type="submit" style={{boxShadow: '0 0 5px 0 rgba(255,255,255,0.5)', color: '#fff', width: 100}} className="py-2 px-2 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10">{t("form.send").toUpperCase()}</button>
              </div>
            </form>
          </div>
        </div>
      </div>  
    </div>
  </div>
  


  );
};

export default Contact;
