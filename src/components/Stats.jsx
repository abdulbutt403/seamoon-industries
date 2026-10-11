import { useEffect, useRef, useState } from "react";
import { stats } from "../constants";
import styles from "../style";

const Stats = () => {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [counts, setCounts] = useState(() => stats.map(() => null));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setCounts(stats.map((stat) => Number.parseInt(stat.value, 10)));
      return;
    }

    let frame;
    let startTime;
    const duration = 1400;
    const animate = (time) => {
      if (startTime === undefined) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCounts(stats.map((stat) => Math.round(Number.parseInt(stat.value, 10) * easedProgress)));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [hasEntered]);

  return (
  <section ref={sectionRef} className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
    {stats.map((stat, index) => (
      <div key={stat.id} className={`flex-1 flex justify-center items-center flex-row m-3`} >
        <h4 aria-label={stat.value} aria-live="off" className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-primaryNavy">
          {counts[index] === null || counts[index] === undefined
            ? stat.value
            : `${counts[index]}${stat.value.replace(/^\d+/, "")}`}
        </h4>
        <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
  );
};

export default Stats;
