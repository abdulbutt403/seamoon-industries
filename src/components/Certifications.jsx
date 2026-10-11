import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const certifications = [
  { name: "ISO 13485", id: "iso-13485", mark: "ISO", icon: "quality" },
  { name: "CE Mark (EU MDR)", id: "ce-mark", mark: "CE", icon: "mark" },
  { name: "US FDA Registration", id: "us-fda", mark: "FDA", icon: "shield" },
  { name: "SIMAP", id: "simap", mark: "S", icon: "star" },
  { name: "SCCI", id: "scci", mark: "SCCI", icon: "building" },
  { name: "ISO 9001:2015", id: "iso-9001", mark: "ISO", icon: "quality" },
];

const CertificationIcon = ({ type, mark }) => {
  const artwork = {
    quality: (
      <>
        <path d="M12 2.8 15 4l3.2-.1 1 3 2 2.5-1.7 2.7-.6 3.2-3.1.6-2.6 1.9-2.5-1.9-3.2-.6-.5-3.2-1.8-2.7 2.1-2.5 1-3L12 2.8Z" />
        <path d="m8.9 10.4 2 2 4.2-4.4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5.5 5.6v5.1c0 4.1 2.6 7.8 6.5 9.6 3.9-1.8 6.5-5.5 6.5-9.6V5.6L12 3Z" />
        <path d="m9.1 11.4 1.8 1.8 4-4.1" />
      </>
    ),
    star: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m12 7.2 1.4 2.9 3.2.5-2.3 2.3.5 3.2-2.8-1.5-2.8 1.5.5-3.2-2.3-2.3 3.2-.5L12 7.2Z" />
      </>
    ),
    building: (
      <>
        <path d="M4 20h16M6 20V9h12v11M9 20v-5h6v5M4.5 9 12 4l7.5 5H4.5Z" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" />
      </>
    ),
  };

  if (type === "mark") {
    return <span className="certification-card__mark">{mark}</span>;
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {artwork[type]}
    </svg>
  );
};

const Certifications = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const revealItems = section.querySelectorAll(
      ".certifications__heading, .certification-card"
    );
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    section.classList.add("certifications--enhanced");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -35px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="certifications" id="certifications" ref={sectionRef}>
      <div className="certifications__heading">
        <span>International compliance</span>
        <h2>Certifications &amp; Quality Standards</h2>
      </div>

      <div className="certifications__grid">
        {certifications.map((certification) => (
          <Link
            className="certification-card"
            key={certification.id}
            to={`/certifications#${certification.id}`}
            aria-label={`View details for ${certification.name}`}
          >
            <span className="certification-card__icon">
              <CertificationIcon
                type={certification.icon}
                mark={certification.mark}
              />
            </span>
            <h3 className="certification-card__title">{certification.name}</h3>
            <span className="certification-card__link-hint" aria-hidden="true">
              View details
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
