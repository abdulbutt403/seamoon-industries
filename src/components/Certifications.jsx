const certifications = [
  { name: "ISO 13485", mark: "ISO", icon: "quality" },
  { name: "CE Mark (EU MDR)", mark: "CE", icon: "mark" },
  { name: "US FDA Registration", mark: "FDA", icon: "shield" },
  { name: "SIMAP", mark: "S", icon: "star" },
  { name: "SCCI", mark: "SCCI", icon: "building" },
  { name: "ISO 9001:2015", mark: "ISO", icon: "quality" },
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

const Certifications = () => (
  <section className="certifications" id="certifications">
    <div className="certifications__heading">
      <span>International compliance</span>
      <h2>Certifications &amp; Quality Standards</h2>
    </div>

    <div className="certifications__grid">
      {certifications.map((certification) => (
        <article className="certification-card" key={certification.name}>
          <div className="certification-card__icon">
            <CertificationIcon
              type={certification.icon}
              mark={certification.mark}
            />
          </div>
          <h3>{certification.name}</h3>
        </article>
      ))}
    </div>
  </section>
);

export default Certifications;
