import { logo } from "../assets";
import { WHATSAPP_NUMBER } from "../constants";
import { useLocation } from "react-router-dom";
import SocialLinks from "./SocialLinks";
const Contact = () => {
  const { search } = useLocation();
  const quoteParams = new URLSearchParams(search);
  const quoteProduct = quoteParams.get("product");
  const quoteQuantity = quoteParams.get("quantity");
  const quoteMessage = quoteProduct
    ? `Please quote ${quoteQuantity || ""} ${quoteProduct}`.trim()
    : "";

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
              <img src={logo} alt="Seamoon Industries" width="1085" height="554" loading="lazy" className="brand-logo brand-logo--contact" />
            </div>
            <div style={{marginTop: 40, color:'#fff'}}>
            <h2 style={{marginBottom: 10, color:'#fff'}}>SALMAN ARSHAD <br/> (CHIEF EXECUTIVE OFFICER)</h2>

            <h5 style={{fontStyle: 'italic', fontWeight: 400, fontSize: 13}}>Sialkot, Small Industrial Estate</h5>
            <h5 style={{fontStyle: 'italic', fontWeight: 400, fontSize: 13, marginBottom: 5}}>Fateh Garh Agency, Cheema Street</h5>

            <div className="app-contact">WHATSAPP : <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>+92 300 7107197</a></div>
            <div className="app-contact">TEL : +92-52-3302249</div>
            <div className="app-contact">EMAIL : <a href="mailto:info@seamoonind.com">info@seamoonind.com</a></div>
            <div className="app-contact">WEB : seamoonind.com</div>
            <SocialLinks className="social-links--contact" />
            </div>
          </div>
          <div className="screen-body-item">
            <form className="app-form" onSubmit={(event) => event.preventDefault()}>
              <div className="app-form-group">
                <label className="sr-only" htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" className="app-form-control" placeholder="NAME"/>
              </div>
              <div className="app-form-group">
                <label className="sr-only" htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" className="app-form-control" placeholder="EMAIL"/>
              </div>
              <div className="app-form-group message">
                <label className="sr-only" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" className="app-form-control" placeholder="MESSAGE" defaultValue={quoteMessage}/>
              </div>
              <div className="app-form-group buttons">
                <button type="reset" style={{boxShadow: '0 0 5px 0 rgba(255,255,255,0.5)', color: '#fff', width: 100, marginRight: 20}} className="py-2 px-2 font-poppins font-medium text-[18px] text-primary rounded-[10px] outline-none mt-10 text-white">CANCEL</button>
                <button type="submit" style={{boxShadow: '0 0 5px 0 rgba(255,255,255,0.5)', color: '#fff', width: 100}} className="py-2 px-2 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10">SEND</button>
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
