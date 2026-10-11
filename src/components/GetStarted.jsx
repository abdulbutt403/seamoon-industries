import { arrowUp } from "../assets";
import { Link } from "react-router-dom";

const GetStarted = () => (
  <Link
    to="/contact"
    aria-label="Request a Quote"
    className="get-started-button font-poppins"
  >
    <span>Request a Quote</span>
    <img src={arrowUp} alt="" className="get-started-button__arrow" />
  </Link>
);

export default GetStarted;
