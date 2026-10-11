export const motion = {
  ease: "power3.out",
  easeIn: "power2.inOut",
  easeCount: "power2.out",
  easePulse: "sine.inOut",
  easeNone: "none",
  revealDuration: 0.72,
  imageDuration: 1.05,
  iconDrawDuration: 0.72,
  countDuration: 1.25,
  splitOffset: 115,
  reducedFadeDuration: 0.42,
  reducedParagraphDuration: 0.4,
  routeFadeDuration: 0.22,
  hoverDuration: 0.32,
  resetDuration: 0.45,
  menuResetDuration: 0.42,
  whatsappEnterDuration: 0.55,
  whatsappPulseDuration: 0.48,
  whatsappPulseCount: 5,
  whatsappPulseInterval: 8,
  paragraphStagger: 0.035,
  headingStagger: 0.035,
  headingOffset: 20,
  paragraphOffset: 16,
  hoverLift: 3,
  highlightOpacity: 0.12,
  highlightRadius: 170,
  reducedHeadingOpacity: 0.7,
  reducedParagraphOpacity: 0.72,
  reducedCardOpacity: 0.55,
  imageClip: 12,
  processTriggerStart: "top 82%",
  processActiveStart: "top 72%",
  processActiveEnd: "bottom 28%",
  navScrollThreshold: 80,
  navDirectionThreshold: 4,
  navHideY: -110,
  whatsappOffset: 30,
  whatsappScale: 1.06,
  hoverScale: 1.5,
  hoverY: 2,
  magneticDuration: 0.32,
  magneticResetDuration: 0.42,
  tiltDuration: 0.3,
  tiltResetDuration: 0.4,
  tiltRotation: 2,
  tiltStrength: 5,
  parallaxDuration: 0.45,
  parallaxFactor: 0.006,
  parallaxScrub: 0.6,
  progressScrub: 0.2,
  imageStart: "top 90%",
  imageScrollStart: "top bottom",
  imageScrollEnd: "bottom top",
  revealStart: "top 88%",
  paragraphStart: "top 90%",
  counterStart: "top 88%",
  revealReducedStart: "top 90%",
  revealClip: 10,
  fastDuration: 0.28,
  menuDuration: 0.42,
  routeDuration: 0.62,
  introDuration: 0.48,
  stagger: 0.075,
  revealY: 28,
  imageScale: 1.06,
  parallaxY: 5,
  magneticStrength: 0.12,
  cursorEase: 0.18,
  cursorRingMultiplier: 1.8,
  hoverTilt: 2,
  hoverDistance: 5,
  menuDistance: 12,
  menuStagger: 0.045,
  kenBurnScale: 1.045,
  kenBurnDuration: 5,
  carouselFadeDuration: 0.8,
  carouselInterval: 5,
  touchSwipeThreshold: 45,
  dragThreshold: 55,
  marqueeDuration: 22,
  shineDuration: 0.7,
  focusDuration: 0.28,
  whatsappDelay: 2,
  failsafeDelay: 2800,
};

export const motionDurationMs = {
  intro: Math.round(motion.introDuration * 1000),
  route: Math.round(motion.routeDuration * 1000),
};

export const applyMotionConfig = () => {
  if (typeof document === "undefined") return;
  const root = document.documentElement.style;
  root.setProperty("--motion-fast", `${motion.fastDuration}s`);
  root.setProperty("--motion-menu", `${motion.menuDuration}s`);
  root.setProperty("--motion-reveal", `${motion.revealDuration}s`);
  root.setProperty("--motion-intro", `${motion.introDuration}s`);
  root.setProperty("--motion-route", `${motion.routeDuration}s`);
  root.setProperty("--motion-stagger", `${motion.stagger}s`);
  root.setProperty("--motion-menu-stagger", `${motion.menuStagger}s`);
  root.setProperty("--motion-menu-distance", `${motion.menuDistance}px`);
  root.setProperty("--motion-hover-distance", `${motion.hoverDistance}px`);
  root.setProperty("--motion-highlight-radius", `${motion.highlightRadius}px`);
  root.setProperty("--motion-ken-burn", `${motion.kenBurnDuration}s`);
  root.setProperty("--motion-ken-burn-scale", String(motion.kenBurnScale));
  root.setProperty("--motion-carousel-fade", `${motion.carouselFadeDuration}s`);
  root.setProperty("--motion-marquee", `${motion.marqueeDuration}s`);
  root.setProperty("--motion-shine", `${motion.shineDuration}s`);
  root.setProperty("--motion-focus", `${motion.focusDuration}s`);
};
