import { useState } from "react";

const CatalogueGrid = ({ instruments, type }) => {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section className="catalogue-list" aria-labelledby="catalogue-list-title">
        <div className="catalogue-list__heading">
          <span>Full product catalogue</span>
          <h2 id="catalogue-list-title">Browse Our {type} Range</h2>
          <p>
            Each product can be produced for export orders and discussed as part
            of an OEM or private-label programme.
          </p>
        </div>

        <div className="catalogue-list__grid">
          {instruments.map((instrument) => (
            <article
              className="catalogue-item"
              key={instrument.image}
              onClick={() => setLightbox(instrument.image)}
              style={{ cursor: "zoom-in" }}
            >
              <div className="catalogue-item__image-wrap">
                <img
                  src={instrument.image}
                  alt={`${type} manufactured by Seamoon Industries`}
                  loading="lazy"
                  className="catalogue-item__image"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="catalogue-lightbox"
          onClick={() => setLightbox(null)}
        >
          <button
            className="catalogue-lightbox__close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <img
            src={lightbox}
            alt={`${type} full view`}
            className="catalogue-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default CatalogueGrid;
