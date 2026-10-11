import { cloneElement, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./config";

gsap.registerPlugin(ScrollTrigger);

export const Reveal = ({ as: Element = "div", children, className = "", ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const tween = gsap.fromTo(element, { autoAlpha: 0, y: motion.revealY }, {
      autoAlpha: 1, y: 0, duration: motion.revealDuration, ease: motion.ease,
      scrollTrigger: { trigger: element, start: motion.revealStart, once: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return <Element ref={ref} data-motion-gsap="true" className={className} {...props}>{children}</Element>;
};

export const SplitHeading = ({ children, className = "" }) => {
  const label = String(children);
  return (
    <span className={`motion-split-heading ${className}`} aria-label={label}>
      {label.split(/(\s+)/).filter(Boolean).map((part, index) => (
        /^\s+$/.test(part)
          ? <span key={`space-${index}`} aria-hidden="true">{part}</span>
          : <span className="motion-split-heading__mask" key={`word-${index}`} aria-hidden="true"><span>{part}</span></span>
      ))}
    </span>
  );
};

export const CountUp = ({ value }) => <span className="motion-count" aria-label={value}><span aria-hidden="true">{value}</span></span>;

export const Marquee = ({ children, className = "" }) => (
  <div className={`motion-marquee ${className}`}>
    <div className="motion-marquee__track">{children}</div>
  </div>
);

export const Magnetic = ({ children, strength = motion.magneticStrength }) => {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const move = (event) => {
      const box = element.getBoundingClientRect();
      gsap.to(element, { x: (event.clientX - box.left - box.width / 2) * strength, y: (event.clientY - box.top - box.height / 2) * strength, duration: motion.magneticDuration, ease: motion.ease });
    };
    const reset = () => gsap.to(element, { x: 0, y: 0, duration: motion.magneticResetDuration, ease: motion.ease });
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", reset); gsap.set(element, { clearProps: "transform" }); };
  }, [strength]);
  return cloneElement(children, { ref, className: `${children.props.className || ""} motion-magnetic`.trim() });
};

export const ParallaxImage = ({ children, ...props }) => cloneElement(children, { ...props, "data-motion-image": "true" });

export const PinnedSteps = ({ children, className = "" }) => <div className={`motion-pinned-steps ${className}`}>{children}</div>;

export const TiltCard = ({ children, strength = 5, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const move = (event) => {
      const bounds = element.getBoundingClientRect();
      gsap.to(element, { x: ((event.clientX - bounds.left) / bounds.width - 0.5) * strength, y: ((event.clientY - bounds.top) / bounds.height - 0.5) * strength, rotateY: ((event.clientX - bounds.left) / bounds.width - 0.5) * motion.tiltRotation, rotateX: ((event.clientY - bounds.top) / bounds.height - 0.5) * -motion.tiltRotation, duration: motion.tiltDuration, ease: motion.ease });
    };
    const reset = () => gsap.to(element, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: motion.tiltResetDuration, ease: motion.ease });
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", reset); gsap.set(element, { clearProps: "transform" }); };
  }, [strength]);
  return cloneElement(children, { ...props, ref, className: `${children.props.className || ""} motion-tilt-card`.trim() });
};
