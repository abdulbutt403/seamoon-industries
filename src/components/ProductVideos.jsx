import { useEffect, useRef, useState } from "react";

const productVideos = [
  {
    title: "Premium Orthodontic Instrument Kit",
    thumbnail: "/assets/thumbnail1.png",
    video: "/assets/vid1.mp4",
  },
  {
    title: "Rubber Dam Kit",
    thumbnail: "/assets/thumbnail2.png",
    video: "/assets/vid2.mp4",
  },
  {
    title: "Three-Piece Examination Set",
    thumbnail: "/assets/thumbnail3.png",
    video: "/assets/vid3.mp4",
  },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m9 7 8 5-8 5V7Z" />
  </svg>
);

const ProductVideos = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const openVideo = (product, trigger) => {
    triggerRef.current = trigger;
    setActiveVideo(product);
  };

  const closeVideo = () => setActiveVideo(null);

  useEffect(() => {
    if (!activeVideo) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeVideo();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeVideo]);

  return (
    <section className="product-videos" id="product-videos">
      <div className="product-videos__glow" aria-hidden="true" />

      <header className="product-videos__header">
        <span className="product-videos__eyebrow">See precision in action</span>
        <h2>Discover Our Products in Motion</h2>
        <p>
          Take a closer look at the quality, detail, and craftsmanship behind
          our professional dental instruments.
        </p>
      </header>

      <div className="product-videos__grid">
        {productVideos.map((product, index) => (
          <button
            className="video-card"
            key={product.video}
            type="button"
            onClick={(event) => openVideo(product, event.currentTarget)}
            aria-label={`Play video: ${product.title}`}
          >
            <img
              className="video-card__image"
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
            />
            <span className="video-card__shade" aria-hidden="true" />
            <span className="video-card__play" aria-hidden="true">
              <PlayIcon />
            </span>
            <span className="video-card__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeVideo();
          }}
        >
          <div className="video-modal__dialog">
            <div className="video-modal__topbar">
              <div>
                <span>Product showcase</span>
                <h3 id="video-modal-title">{activeVideo.title}</h3>
              </div>
              <button
                className="video-modal__close"
                type="button"
                onClick={closeVideo}
                ref={closeButtonRef}
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <video
              className="video-modal__player"
              key={activeVideo.video}
              src={activeVideo.video}
              poster={activeVideo.thumbnail}
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video element.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductVideos;
