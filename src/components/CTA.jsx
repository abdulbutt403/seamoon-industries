import styles from "../style";
import Button from "./Button";
import person from "../assets/4.png"

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col rounded-[20px] box-shadow`}
  >
      <div className="card">
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
            src="https://images.pexels.com/photos/3379933/pexels-photo-3379933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
          />
        </div>
        <div className="content">
          <div className="contentBx">
            <h3>
              John <br />
              <span>Web Developer</span>
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
            src="https://images.pexels.com/photos/3379933/pexels-photo-3379933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
          />
        </div>
        <div className="content">
          <div className="contentBx">
            <h3>
              John <br />
              <span>Web Developer</span>
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
);

export default CTA;
