import { Link } from "react-router-dom";

const InternalPageLinks = ({ links, title = "Explore Seamoon Industries" }) => (
  <nav className="internal-links" aria-label={title}>
    <p>{title}</p>
    <div className="internal-links__list">
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          <span>{link.label}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13M14 7l5 5-5 5" />
          </svg>
        </Link>
      ))}
    </div>
  </nav>
);

export default InternalPageLinks;
