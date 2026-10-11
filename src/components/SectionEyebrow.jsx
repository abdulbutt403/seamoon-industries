import { useEffect, useRef, useState } from "react";

const SectionEyebrow = ({ children, className = "" }) => {
  const eyebrowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const eyebrow = eyebrowRef.current;
    if (!eyebrow) return undefined;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(eyebrow);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={eyebrowRef}
      className={`section-eyebrow ${className} ${isVisible ? "section-eyebrow--visible" : ""}`}
    >
      {children}
    </span>
  );
};

export default SectionEyebrow;
