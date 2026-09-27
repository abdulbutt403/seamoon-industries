import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/surgical-cover.jpg";
import styles, { layout } from "../style";

const SURGICAL_CATALOGUE_URL =
  "https://drive.google.com/file/d/1mzvIzo2baEaWragexg72_iPXw8a3BBWA/view?usp=sharing";
const SURGICAL_CATALOGUE_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1mzvIzo2baEaWragexg72_iPXw8a3BBWA";

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
        <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full sm:w-auto">
          <a
            href={SURGICAL_CATALOGUE_URL}
            className="w-full sm:w-auto py-4 px-4 sm:px-6 font-poppins font-medium text-[16px] sm:text-[18px] text-center text-primary bg-blue-gradient rounded-[10px] outline-none"
          >
            BROWSE SURGICAL INSTRUMENTS
          </a>
          <a
            href={SURGICAL_CATALOGUE_DOWNLOAD_URL}
            download
            className="w-full sm:w-auto py-4 px-4 sm:px-6 font-poppins font-medium text-[16px] sm:text-[18px] text-center text-primary bg-blue-gradient rounded-[10px] outline-none"
          >
            DOWNLOAD CATALOGUE
          </a>
        </div>
      </div>
    </section>
  );
}
