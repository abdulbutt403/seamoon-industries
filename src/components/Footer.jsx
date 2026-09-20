import { Link } from "react-router-dom";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import styles from "../style";

const Footer = () => (
  <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="Seamoon Industries"
          className="w-[266px] h-[72.14px] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          A trusted manufacturer and exporter of quality dental and surgical
          instruments.
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
              {group.title}
            </h2>
            <ul className="list-none mt-4">
              {group.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                    index !== group.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright {new Date().getFullYear()} Seamoon Industries. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Seamoon Industries on ${social.name}`}
            className={`block w-[21px] h-[21px] ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
          >
            <img src={social.icon} alt="" className="w-full h-full object-contain" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
