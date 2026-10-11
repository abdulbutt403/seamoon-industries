import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { motion, motionDurationMs } from "./config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const finePointerQuery = "(hover: hover) and (pointer: fine)";

const MotionSystem = () => {
  const location = useLocation();
  const lastScrollY = useRef(0);
  const routeRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let timeoutId;
    try {
      root.classList.add("js");
      timeoutId = window.setTimeout(
        () => root.classList.add("motion-failsafe"),
        motion.failsafeDelay
      );
    } catch {
      root.classList.add("motion-failsafe");
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(reducedMotionQuery).matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) return undefined;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });
    const onScroll = () => ScrollTrigger.update();
    const onFrame = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", onScroll);
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onFrame);
      lenis.destroy();
    };
  }, []);

  const setupCursor = useCallback(() => {
    if (window.matchMedia(reducedMotionQuery).matches || !window.matchMedia(finePointerQuery).matches) return;

    const dot = document.querySelector(".motion-cursor__dot");
    const ring = document.querySelector(".motion-cursor__ring");
    if (!dot || !ring) return;

    const xToDot = gsap.quickTo(dot, "x", { duration: motion.cursorEase, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: motion.cursorEase, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: motion.cursorEase * motion.cursorRingMultiplier, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: motion.cursorEase * motion.cursorRingMultiplier, ease: "power3" });
    const move = (event) => {
      xToDot(event.clientX);
      yToDot(event.clientY);
      xToRing(event.clientX);
      yToRing(event.clientY);
    };
    const over = (event) => {
      if (event.target.closest("a, button, input, textarea, select")) {
        gsap.to(ring, { scale: motion.hoverScale, duration: motion.fastDuration, overwrite: true });
      }
    };
    const out = (event) => {
      if (event.target.closest("a, button, input, textarea, select")) {
        gsap.to(ring, { scale: 1, duration: motion.fastDuration, overwrite: true });
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    gsap.set([dot, ring], { autoAlpha: 1 });

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      gsap.set([dot, ring], { autoAlpha: 0 });
    };
  }, []);

  useGSAP(() => {
    const reduced = window.matchMedia(reducedMotionQuery).matches;
    const main = document.querySelector("main");
    const revealGroups = [
      ".feature-card",
      ".certification-card",
      ".process-card",
      ".oem-service",
      ".video-card",
      ".category-card",
      ".product-card",
      ".catalogue-item",
      ".certification-detail-row",
      ".internal-links__list a",
      ".catalogue-action-button",
      ".catalogue-back-link",
      ".manufacturing-process__eyebrow",
      ".certifications__heading > span",
      ".oem-services__header > div > span",
      ".product-videos__eyebrow",
      ".app-form-group",
      ".screen-body-item.left h5, .screen-body-item.left .app-contact",
      "footer h2, footer li, footer > div > div > p",
      ".social-links__item",
    ];
    let intro = false;
    try {
      intro = !reduced && location.pathname === "/" && !sessionStorage.getItem("seamoon-intro-seen");
    } catch { /* Session storage can be disabled. */ }
    const removeListeners = [];

    if (intro) {
      sessionStorage.setItem("seamoon-intro-seen", "1");
      const overlay = document.querySelector(".motion-intro");
      if (overlay) {
        gsap.fromTo(
          overlay,
          { clipPath: "inset(0 0 0 0)" },
          { clipPath: "inset(0 0 100% 0)", duration: motionDurationMs.intro / 1000, ease: motion.easeIn, onComplete: () => overlay.remove() }
        );
      }
      const logo = document.querySelector(".brand-logo--nav");
      if (logo) gsap.fromTo(logo, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: motionDurationMs.intro / 1000, ease: motion.ease });
    } else {
      document.querySelector(".motion-intro")?.remove();
    }

    if (main && routeRef.current !== location.pathname) {
      const isFirstRoute = routeRef.current === null;
      routeRef.current = location.pathname;
      if (isFirstRoute) {
        // Keep the first server-rendered view clear for LCP and assistive technology.
      } else if (reduced) {
        gsap.fromTo(main, { autoAlpha: 0.86 }, { autoAlpha: 1, duration: motion.routeFadeDuration, clearProps: "opacity,visibility" });
      } else {
        gsap.fromTo(main, { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: motion.routeDuration, ease: motion.ease, clearProps: "clipPath" });
      }
      const heading = main.querySelector("h1");
      if (heading && !isFirstRoute) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }

    const splitWords = gsap.utils.toArray(".motion-split-heading__mask > span");
    splitWords.forEach((word) => { word.closest(".motion-split-heading__mask").dataset.motionGsap = "true"; });
    splitWords.forEach((word) => { word.dataset.motionGsap = "true"; });
    if (!reduced && splitWords.length) {
      gsap.fromTo(splitWords, { yPercent: motion.splitOffset }, { yPercent: 0, duration: motion.revealDuration, stagger: motion.headingStagger, ease: motion.ease, clearProps: "transform" });
    }

    const headings = gsap.utils.toArray("main h2, main h3").filter((heading) => !heading.closest(".certification-card, .process-card, .oem-service, .video-card, .category-card"));
    headings.forEach((heading) => { heading.dataset.motionGsap = "true"; });
    if (headings.length) ScrollTrigger.batch(headings, {
      start: motion.revealStart, once: true,
      onEnter: (batch) => gsap.fromTo(batch, { autoAlpha: reduced ? motion.reducedHeadingOpacity : 0, y: reduced ? 0 : motion.headingOffset }, {
        autoAlpha: 1, y: 0, duration: reduced ? motion.reducedFadeDuration : motion.revealDuration, stagger: motion.stagger, ease: motion.ease, clearProps: "opacity,visibility,transform",
      }),
    });
    const paragraphs = gsap.utils.toArray("main p").filter((paragraph) => !paragraph.closest(".page-hero, .feature-card, .certification-card, .process-card, .oem-service, .video-card, .category-card"));
    paragraphs.forEach((paragraph) => { paragraph.dataset.motionGsap = "true"; });
    if (paragraphs.length) ScrollTrigger.batch(paragraphs, {
      start: motion.paragraphStart, once: true,
      onEnter: (batch) => gsap.fromTo(batch, { autoAlpha: reduced ? motion.reducedParagraphOpacity : 0, y: reduced ? 0 : motion.paragraphOffset }, {
        autoAlpha: 1, y: 0, duration: reduced ? motion.reducedParagraphDuration : motion.revealDuration, stagger: motion.paragraphStagger, ease: motion.ease, clearProps: "opacity,visibility,transform",
      }),
    });

    revealGroups.forEach((selector) => {
      const elements = gsap.utils.toArray(selector);
      if (!elements.length) return;
      elements.forEach((element) => { element.dataset.motionGsap = "true"; });
      ScrollTrigger.batch(elements, {
        start: reduced ? motion.revealReducedStart : motion.revealStart,
        once: true,
        onEnter: (batch) => gsap.fromTo(batch,
          { autoAlpha: reduced ? motion.reducedCardOpacity : 0, y: reduced ? 0 : motion.revealY, clipPath: `inset(0 0 ${motion.revealClip}% 0)` },
          { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: reduced ? motion.reducedFadeDuration : motion.revealDuration, stagger: motion.stagger, ease: motion.ease, clearProps: "opacity,visibility,transform,clipPath" }
        ),
      });
    });

    const belowFoldImages = gsap.utils.toArray("main img:not(.hero-carousel__image)");
    if (!reduced && !window.matchMedia("(pointer: coarse)").matches) {
      belowFoldImages.forEach((image) => {
        image.dataset.motionGsap = "true";
        const frame = image.closest(".category-card__image-wrap, .media-container, .app, .catalogue-image, .section-img") || image;
        gsap.fromTo(image, { clipPath: `inset(0 0 ${motion.imageClip}% 0)`, scale: motion.imageScale }, {
          clipPath: "inset(0 0 0% 0)", scale: 1, duration: motion.imageDuration, ease: motion.ease,
          scrollTrigger: { trigger: frame, start: motion.imageStart, once: true },
        });
        if (frame !== image) {
          gsap.to(image, { yPercent: -motion.parallaxY, ease: motion.easeNone, scrollTrigger: { trigger: frame, start: motion.imageScrollStart, end: motion.imageScrollEnd, scrub: motion.parallaxScrub } });
        }
      });
    }

    const stats = gsap.utils.toArray(".motion-count > span");
    stats.forEach((element) => {
      const label = element.parentElement.getAttribute("aria-label");
      const target = Number(label.replace("+", ""));
      const counter = { value: 0 };
      ScrollTrigger.create({
        trigger: element,
        start: motion.counterStart,
        once: true,
        onEnter: () => {
          element.parentElement.classList.add("motion-count--active");
          gsap.to(counter, { value: target, duration: reduced ? motion.reducedParagraphDuration : motion.countDuration, ease: motion.easeCount, onUpdate: () => { element.textContent = `${Math.round(counter.value)}+`; }, onComplete: () => { element.textContent = label; } });
        },
      });
    });

    const progress = document.querySelector(".motion-progress");
    if (progress) gsap.to(progress, { scaleX: 1, ease: motion.easeNone, scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: motion.progressScrub } });

    const processCards = gsap.utils.toArray(".process-card");
    processCards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: motion.processActiveStart,
        end: motion.processActiveEnd,
        onToggle: ({ isActive }) => card.classList.toggle("process-card--active", isActive),
      });
      gsap.utils.toArray("path, circle", card.querySelector(".process-card__icon")).forEach((path) => {
        try {
          const length = path.getTotalLength();
          path.style.strokeDasharray = String(length);
          ScrollTrigger.create({ trigger: card, start: motion.processTriggerStart, once: true, onEnter: () => gsap.fromTo(path, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: motion.iconDrawDuration, ease: motion.ease }) });
        } catch { /* Keep unsupported SVG shapes intact. */ }
      });
    });

    const navbar = document.querySelector(".navbar");
    const headerShell = document.querySelector(".motion-header-shell");
    if (navbar && headerShell && !reduced) {
      ScrollTrigger.create({
        start: 0,
        onUpdate: (self) => {
          const currentY = self.scroll();
          headerShell?.classList.toggle("motion-header-shell--scrolled", currentY > 24);
          if (currentY < motion.navScrollThreshold || document.querySelector(".sidebar.flex")) {
            gsap.to(headerShell, { yPercent: 0, duration: motion.fastDuration, overwrite: true });
          } else if (currentY > lastScrollY.current + motion.navDirectionThreshold) {
            gsap.to(headerShell, { yPercent: motion.navHideY, duration: motion.fastDuration, overwrite: true });
          } else if (currentY < lastScrollY.current - motion.navDirectionThreshold) {
            gsap.to(headerShell, { yPercent: 0, duration: motion.fastDuration, overwrite: true });
          }
          lastScrollY.current = currentY;
        },
      });
    }

    const whatsapp = document.querySelector(".whatsapp-button");
    if (whatsapp && !reduced) {
      gsap.fromTo(whatsapp, { autoAlpha: 0, x: motion.whatsappOffset }, { autoAlpha: 1, x: 0, delay: motion.whatsappDelay, duration: motion.whatsappEnterDuration, ease: motion.ease, clearProps: "opacity,visibility,transform" });
      try {
        const key = "seamoon-whatsapp-pulses";
        const count = Number(sessionStorage.getItem(key) || 0);
        if (count < 3) {
          sessionStorage.setItem(key, String(count + 1));
          gsap.to(whatsapp, { scale: motion.whatsappScale, duration: motion.whatsappPulseDuration, repeat: motion.whatsappPulseCount, yoyo: true, delay: motion.whatsappDelay + motion.whatsappPulseInterval, repeatDelay: motion.whatsappPulseInterval, ease: motion.easePulse, overwrite: false });
        }
      } catch { /* Storage can be unavailable in private contexts. */ }
    }

    if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      gsap.utils.toArray("a, button").forEach((button) => {
        const enter = () => gsap.to(button, { y: -motion.hoverY, duration: motion.fastDuration, ease: motion.ease, overwrite: true });
        const leave = () => gsap.to(button, { y: 0, duration: motion.fastDuration, ease: motion.ease, overwrite: true });
        button.addEventListener("pointerenter", enter);
        button.addEventListener("pointerleave", leave);
        removeListeners.push(() => {
          button.removeEventListener("pointerenter", enter);
          button.removeEventListener("pointerleave", leave);
        });
      });

      gsap.utils.toArray(".feature-card, .certification-card, .process-card, .oem-service, .category-card, .product-card, .catalogue-item").forEach((card) => {
        const move = (event) => {
          const bounds = card.getBoundingClientRect();
          const dx = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
          const dy = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
          card.style.setProperty("--motion-x", `${event.clientX - bounds.left}px`);
          card.style.setProperty("--motion-y", `${event.clientY - bounds.top}px`);
          card.style.setProperty("--motion-highlight-opacity", String(motion.highlightOpacity));
          gsap.to(card, { x: dx * motion.tiltStrength, y: dy * motion.tiltStrength - motion.hoverLift, rotateY: dx * motion.hoverTilt, rotateX: dy * -motion.hoverTilt, duration: motion.hoverDuration, ease: motion.ease, overwrite: true });
        };
        const reset = () => {
          card.style.setProperty("--motion-highlight-opacity", "0");
          gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: motion.resetDuration, ease: motion.ease, overwrite: true });
        };
        card.addEventListener("pointermove", move, { passive: true });
        card.addEventListener("pointerleave", reset);
        removeListeners.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", reset);
        });
      });
      const carousel = document.querySelector(".hero-carousel");
      if (carousel) {
        const parallax = (event) => {
          const image = carousel.querySelector(".hero-carousel__slide--active .hero-carousel__image");
          if (!image) return;
          const bounds = carousel.getBoundingClientRect();
          const x = (event.clientX - bounds.left - bounds.width / 2) * motion.parallaxFactor;
          const y = (event.clientY - bounds.top - bounds.height / 2) * motion.parallaxFactor;
          gsap.to(image, { "--motion-image-x": `${x}px`, "--motion-image-y": `${y}px`, duration: motion.parallaxDuration, ease: motion.ease, overwrite: true });
        };
        carousel.addEventListener("pointermove", parallax, { passive: true });
        removeListeners.push(() => carousel.removeEventListener("pointermove", parallax));
      }
    }

    const cleanupCursor = setupCursor();
    ScrollTrigger.refresh();
    return () => {
      cleanupCursor?.();
      removeListeners.forEach((remove) => remove());
    };
  }, { scope: undefined, dependencies: [location.pathname], revertOnUpdate: true });

  return null;
};

export default MotionSystem;
