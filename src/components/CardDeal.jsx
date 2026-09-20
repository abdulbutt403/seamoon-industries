import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/dental-cover.jpg";
import styles, { layout } from "../style";

export default function CardDeal() {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo2}>
        <h2 className={styles.heading2} style={{ textAlign: "right" }}>
          Explore our dental <br className="sm:block hidden" /> instruments.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`} style={{ textAlign: "right" }}>
          Browse precision instruments for extraction, restorative dentistry,
          diagnostics, orthodontics, and complete procedure sets manufactured
          for professional use and international supply.
        </p>
        <Link to="/dental-instruments" className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10">
          BROWSE DENTAL INSTRUMENTS
        </Link>
      </div>

      <div className={layout.sectionImg} id="product">
        <Link className="app" id="dental-catalogue-preview" data-current-media="book" to="/dental-instruments" aria-label="Browse dental instruments">
          <article className="media-container">
            <div className="book-wrapper">
              <div className="book">
                <div className="book__front">
                  <img src={cover} alt="Dental instruments catalogue cover" />
                </div>
                <div className="book__paper" />
                <div className="book__back" />
              </div>
              <div className="book-shadow" />
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
