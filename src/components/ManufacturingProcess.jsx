import { useEffect, useRef } from "react";

const processSteps = [
  {
    title: "Material Selection",
    description:
      "We use only high-grade medical/scientific stainless steel (German & Japanese Grade), which is rust-resistant and built to last.",
    icon: "material",
  },
  {
    title: "Precision Forging & Shaping",
    description:
      "Our skilled craftsmen combine modern technology with traditional craftsmanship to give every instrument accurate dimensions and precise shaping.",
    icon: "forging",
  },
  {
    title: "Heat Treatment",
    description:
      "Instruments undergo specialized heat treatment to enhance hardness and durability, ensuring their tips and cutting edges remain sharp and strong for a long time.",
    icon: "heat",
  },
  {
    title: "Hand Crafting & Polishing",
    description:
      "Every instrument is polished by skilled craftsmen. We offer Satin, Mirror, and Titanium-Coated finishes.",
    icon: "polish",
  },
  {
    title: "Strict Quality Control & Inspection",
    description:
      "Before packaging, every instrument is inspected under a microscope and checked using precise manual measurements to ensure zero defects and consistent quality.",
    icon: "quality",
  },
];

const ProcessIcon = ({ type }) => {
  const paths = {
    material: (
      <>
        <path d="M12 3 4.5 7 12 11l7.5-4L12 3Z" />
        <path d="m4.5 11 7.5 4 7.5-4M4.5 15l7.5 4 7.5-4" />
      </>
    ),
    forging: (
      <>
        <path d="M14.5 5.5 18.5 9.5M13 7l4 4" />
        <path d="m15.5 3 5.5 5.5-3 3L12.5 6l3-3ZM11.5 9.5 4 17v3h3l7.5-7.5" />
      </>
    ),
    heat: (
      <path d="M12 21c3.1 0 5.5-2.1 5.5-5.2 0-2.4-1.5-4.1-3.1-5.8-.6 2.1-1.7 3-2.4 3.5.2-3.8-1.3-6.6-3.6-9.5.1 4-2 6.1-2 9.1C6.4 17.9 8.8 21 12 21Z" />
    ),
    polish: (
      <>
        <path d="m12 3 .9 3.1L16 7l-3.1.9L12 11l-.9-3.1L8 7l3.1-.9L12 3ZM18.5 12l.6 2.1 2.1.6-2.1.6-.6 2.2-.6-2.2-2.2-.6 2.2-.6.6-2.1ZM6 13l.7 2.3L9 16l-2.3.7L6 19l-.7-2.3L3 16l2.3-.7L6 13Z" />
      </>
    ),
    quality: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.2 15.2 4.8 4.8M8 10.5l1.7 1.7 3.6-3.8" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
};

const ManufacturingProcess = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      section.classList.add("manufacturing-process--visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("manufacturing-process--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="manufacturing-process"
      id="manufacturing-process"
      ref={sectionRef}
    >
      <div className="manufacturing-process__glow manufacturing-process__glow--one" />
      <div className="manufacturing-process__glow manufacturing-process__glow--two" />

      <header className="manufacturing-process__header">
        <span className="manufacturing-process__eyebrow">From steel to precision</span>
        <h2>Our Manufacturing Process</h2>
        <p>
          Five carefully controlled stages turn premium steel into dependable,
          precision-crafted instruments.
        </p>
      </header>

      <div className="manufacturing-process__grid">
        {processSteps.map((step, index) => (
          <article
            className="process-card"
            key={step.title}
            style={{ "--step-delay": `${130 + index * 105}ms` }}
          >
            <div className="process-card__shine" />
            <div className="process-card__topline">
              <div className="process-card__icon">
                <ProcessIcon type={step.icon} />
              </div>
              <span className="process-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <div className="process-card__edge" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManufacturingProcess;
