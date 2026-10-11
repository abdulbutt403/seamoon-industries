import { arrowUp } from "../assets";
import { Link } from "react-router-dom";

const GetStarted = () => (
  <Link
    to="/contact"
    aria-label="Work With Us"
    className="get-started-button font-poppins"
  >
    <span>Work With Us</span>
    <img src={arrowUp} alt="" className="get-started-button__arrow" />
  </Link>
);

export default GetStarted;
