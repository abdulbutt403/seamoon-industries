const oemServices = [
  {
    title: "Private Label / White Label Manufacturing",
    description:
      "Your brand name engraved or laser-etched on every instrument. Full packaging design support available.",
    icon: "label",
  },
  {
    title: "Custom Instrument Design",
    description:
      "Unique instrument geometries, custom lengths, tip shapes and handle designs built to your specifications.",
    icon: "design",
  },
  {
    title: "Material Customisation",
    description:
      "German 420/440 stainless steel, titanium-coated or tungsten carbide insert options available on request.",
    icon: "material",
  },
  {
    title: "Custom Packaging & Surgical Sets",
    description:
      "Complete surgical kit assembly in custom trays, pouches and sterilisation packaging with your branding.",
    icon: "package",
  },
];

const OEMIcon = ({ type }) => {
  const icons = {
    label: (
      <>
        <path d="M4 6.5V4h2.5L20 17.5 17.5 20 4 6.5Z" />
        <circle cx="7.4" cy="7.4" r="1.2" />
        <path d="m11 11 4 4" />
      </>
    ),
    design: (
      <>
        <path d="M4 17.5 15.8 5.7l2.5 2.5L6.5 20H4v-2.5Z" />
        <path d="m13.8 7.7 2.5 2.5M5 4h5M5 4v5M19 20h-5M19 20v-5" />
      </>
    ),
    material: (
      <>
        <path d="M9 3h6M10 3v5l-5 8.5A3 3 0 0 0 7.6 21h8.8a3 3 0 0 0 2.6-4.5L14 8V3" />
        <path d="M7.3 14h9.4M9.5 17h.01M13.5 18h.01" />
      </>
    ),
    package: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4v10l-8 4-8-4V7ZM12 11v10M8 5l8 4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  );
};

const OEMServices = () => (
  <section className="oem-services" id="oem-services">
    <header className="oem-services__header">
      <div>
        <span>Built around your brand</span>
        <h2>Our OEM Services Include</h2>
      </div>
      <p>
        From the first sketch to the final branded package, we adapt every
        detail to your market and requirements.
      </p>
    </header>

    <div className="oem-services__journey">
      <div className="oem-services__line" aria-hidden="true" />
      {oemServices.map((service, index) => (
        <article className="oem-service" key={service.title}>
          <div className="oem-service__marker">
            <span className="oem-service__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="oem-service__icon">
              <OEMIcon type={service.icon} />
            </div>
          </div>
          <div className="oem-service__copy">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default OEMServices;
