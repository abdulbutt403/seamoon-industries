import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/surgical-cover.jpg";
import styles, { layout } from "../style";

export default function CardDeal2() {
  return (
    <section className={layout.section}>
      <div className={layout.sectionImg}>
        <Link className="app" id="surgical-catalogue-preview" data-current-media="book" to="/surgical-instruments" aria-label="Browse surgical instruments">
          <article className="media-container">
            <div className="book-wrapper">
              <div className="book">
                <div className="book__front">
                  <img src={cover} alt="Surgical instruments catalogue cover" />
                </div>
                <div className="book__paper" />
                <div className="book__back" />
              </div>
              <div className="book-shadow" />
            </div>
          </article>
        </Link>
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Explore our surgical <br className="sm:block hidden" /> instruments.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Discover reusable instruments for general, vascular, diagnostic,
          orthopaedic, and specialised procedures, available for export and
          custom OEM programmes.
        </p>
        <Link to="/surgical-instruments" className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10">
          BROWSE SURGICAL INSTRUMENTS
        </Link>
      </div>
    </section>
  );
}
