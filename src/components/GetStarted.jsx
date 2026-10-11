import styles from "../style";
import { arrowUp } from "../assets";
import { Link } from "react-router-dom";

const GetStarted = () => (
  <Link to="/contact" aria-label="Request a Quote" className={`${styles.flexCenter} gts w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`} style={{width: '100%'}}>
      <span className="font-poppins font-medium text-[16px] leading-[23px] text-gradient text-center">Request a Quote</span>
      <img src={arrowUp} alt="" aria-hidden="true" className="w-[23px] h-[23px] object-contain" />
    </div>
  </Link>
);

export default GetStarted;
