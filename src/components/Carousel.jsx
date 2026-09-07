import { useCallback, useEffect, useRef, useState } from "react";

const slides = Array.from(
  { length: 5 },
  (_, index) => `/assets/carousel/img${index + 1}.jpg`
);

const ArrowIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`h-5 w-5 ${direction === "next" ? "rotate-180" : ""}`}
    fill="none"
  >
    <path
      d="m15 18-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const showSlide = useCallback((index) => {
    setActiveSlide((index + slides.length) % slides.length);
  }, []);

  const showNextSlide = useCallback(() => {
    setActiveSlide((current) => (current + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(showNextSlide, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, showNextSlide]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") showSlide(activeSlide - 1);
    if (event.key === "ArrowRight") showSlide(activeSlide + 1);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 45) {
      showSlide(activeSlide + (distance > 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Seamoon Industries highlights"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-carousel__track">
        {slides.map((src, index) => (
          <div
            key={src}
            className={`hero-carousel__slide ${
              activeSlide === index ? "hero-carousel__slide--active" : ""
            }`}
            aria-hidden={activeSlide !== index}
          >
            <img
              src={src}
              alt={`Seamoon Industries showcase ${index + 1}`}
              className="hero-carousel__image"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="hero-carousel__shade" aria-hidden="true" />

      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--previous"
        onClick={() => showSlide(activeSlide - 1)}
        aria-label="Show previous slide"
      >
        <ArrowIcon direction="previous" />
      </button>
      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--next"
        onClick={() => showSlide(activeSlide + 1)}
        aria-label="Show next slide"
      >
        <ArrowIcon direction="next" />
      </button>

      <div className="hero-carousel__footer">
        <span className="hero-carousel__count" aria-live="polite">
          {String(activeSlide + 1).padStart(2, "0")}
          <span aria-hidden="true"> / {String(slides.length).padStart(2, "0")}</span>
        </span>
        <div className="hero-carousel__dots" aria-label="Choose a slide">
          {slides.map((src, index) => (
            <button
              type="button"
              key={src}
              className={`hero-carousel__dot ${
                activeSlide === index ? "hero-carousel__dot--active" : ""
              }`}
              onClick={() => showSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
