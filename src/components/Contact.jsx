import  logo  from "../assets/logo.svg";
import person from "../assets/4.png"
const Contact = () => (
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
              <img src={logo}/>
            </div>
            <div style={{marginTop: 40, color:'#fff'}}>
            <h1 style={{marginBottom: 10, color:'#fff'}}>SALMAN ARSHAD <br/> (CHIEF EXECUTIVE OFFICER)</h1>

            <h5 style={{fontStyle: 'italic', fontWeight: 400, fontSize: 13}}>Sialkot, Small Industrial Estate</h5>
            <h5 style={{fontStyle: 'italic', fontWeight: 400, fontSize: 13, marginBottom: 5}}>Fateh Garh Agency, Cheema Street</h5>

            <div className="app-contact">WHATSAPP : +92-300-7107197</div>
            <div className="app-contact">TEL : +92-52-3302249</div>
            <div className="app-contact">EMAIL : info@seamoonind.com</div>
            <div className="app-contact">GMAIL : seamoonind@gmail.com</div>
            <div className="app-contact">WEB : www.seamoonind.com</div>
            </div>
          </div>
          <div className="screen-body-item">
            <div className="app-form">
              <div className="app-form-group">
                <input className="app-form-control" placeholder="NAME"/>
              </div>
              <div className="app-form-group">
                <input className="app-form-control" placeholder="EMAIL"/>
              </div>
              <div className="app-form-group message">
                <textarea className="app-form-control" placeholder="MESSAGE"/>
              </div>
              <div className="app-form-group buttons">
                <button style={{boxShadow: '0 0 5px 0 rgba(255,255,255,0.5)', color: '#fff', width: 100, marginRight: 20}} className="py-2 px-2 font-poppins font-medium text-[18px] text-primary rounded-[10px] outline-none mt-10 text-white">CANCEL</button>
                <button style={{boxShadow: '0 0 5px 0 rgba(255,255,255,0.5)', color: '#fff', width: 100}} className="py-2 px-2 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10">SEND</button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
  


);

export default Contact;
