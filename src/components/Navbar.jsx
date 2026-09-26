import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const currentPath =
    location.pathname !== "/"
      ? location.pathname.replace(/\/$/, "")
      : location.pathname;

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to="/" aria-label="Seamoon Industries home">
        <img src={logo} alt="Seamoon Industries" className="w-[124px] h-[32px]" />
      </Link>

      <ul className="list-none lg:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.path}
            className={`navbar__link font-poppins font-normal cursor-pointer text-[16px] ${
              currentPath === nav.path ? "navbar__link--active" : ""
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          >
            <Link to={nav.path}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      <div className="lg:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } z-[100] p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[210px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.path}
                className={`navbar__link font-poppins font-medium cursor-pointer text-[16px] ${
                  currentPath === nav.path ? "navbar__link--active" : ""
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setToggle(false)}
              >
                <Link to={nav.path}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
