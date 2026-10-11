import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const certifications = [
  { name: "ISO 13485", id: "iso-13485", mark: "ISO", icon: "medical" },
  { name: "CE Mark (EU MDR)", id: "ce-mark", mark: "CE", icon: "mark" },
  { name: "US FDA Registration", id: "us-fda", mark: "FDA", icon: "shield" },
  { name: "SIMAP", id: "simap", mark: "S", icon: "star" },
  { name: "SCCI", id: "scci", mark: "SCCI", icon: "building" },
  { name: "ISO 9001:2015", id: "iso-9001", mark: "ISO", icon: "certificate" },
];

const CertificationIcon = ({ type, mark }) => {
  const artwork = {
    medical: (
      <>
        <path d="M12 21s7-3.5 7-10V5l-7-2-7 2v6c0 6.5 7 10 7 10Z" />
        <path d="M12 7v7M8.5 10.5h7" />
      </>
    ),
    certificate: (
      <>
        <path d="M7 3.5h8l4 4V16H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
        <path d="M15 3.5v4h4M8.5 10h7M8.5 13h4" />
        <circle cx="16.5" cy="17" r="3" />
        <path d="m15 19.5-.5 2 2-1 2 1-.5-2" />
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
