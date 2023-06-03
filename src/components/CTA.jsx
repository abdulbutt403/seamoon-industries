import styles from "../style";
import Button from "./Button";
import person from "../assets/4.png"
import person2 from "../assets/5.png"
import person3 from "../assets/9.png"
import person4 from "../assets/92.jpg"

const CTA = () => (
  <>
   <h2 className={styles.heading2} style={{margin: 'auto', textAlign: 'center', marginTop: 100 }}>Meet our Team</h2>
  <section
    className={`${styles.flexCenter} ${styles.padding} sm:flex-row flex-col rounded-[20px]`}
  >
      <div className="card" id="clients">
        <div className="imgBx">
          <img
            src={person}
            alt=""
            className="custom-image"
          />
        </div>
        <div className="content">
          <div className="contentBx">
            <h3>
              SALMAN <br />
              <span>CEO & FOUNDER</span>
            </h3>
          </div>
          <ul className="sci">
            <li >
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="imgBx">
          <img
            src={person2}
            alt=""
            className="custom-image-2"
          />
        </div>
        <div className="content">
          <div className="contentBx">
            <h3>
              MEHAR AMIR <br />
              <span>Support Manager</span>
            </h3>
          </div>
          <ul className="sci">
            <li >
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>


      <div className="card">
        <div className="imgBx">
          <img
            src={person4}
            alt=""
            className="custom-image-3"
          />
        </div>
        <div className="content">
          <div className="contentBx">
            <h3>
              MEHAR KHAWAR <br />
              <span>EXPERT ADVISOR</span>
            </h3>
          </div>
          <ul className="sci">
            <li >
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="imgBx">
          <img
            src={person3}
            alt=""
          />
        </div>
        <div className="content">
          <div className="contentBx">
            <h3>
              MEHAR AKHTER <br />
              <span>MARKETING MANAGER</span>
            </h3>
          </div>
          <ul className="sci">
            <li >
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li >
              <a href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
  </section>
  </>
);

export default CTA;
