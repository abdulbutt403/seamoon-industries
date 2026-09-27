import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/dental-cover.jpg";
import styles, { layout } from "../style";

const DENTAL_CATALOGUE_URL =
  "https://drive.google.com/file/d/1mzvIzo2baEaWragexg72_iPXw8a3BBWA/view?usp=sharing";
const DENTAL_CATALOGUE_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1mzvIzo2baEaWragexg72_iPXw8a3BBWA";

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
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-10 w-full sm:w-auto">
          <a
            href={DENTAL_CATALOGUE_URL}
            className="w-full sm:w-auto py-4 px-4 sm:px-6 font-poppins font-medium text-[16px] sm:text-[18px] text-center text-primary bg-blue-gradient rounded-[10px] outline-none"
          >
            BROWSE DENTAL INSTRUMENTS
          </a>
          <a
            href={DENTAL_CATALOGUE_DOWNLOAD_URL}
            download
            className="w-full sm:w-auto py-4 px-4 sm:px-6 font-poppins font-medium text-[16px] sm:text-[18px] text-center text-primary bg-blue-gradient rounded-[10px] outline-none"
          >
            DOWNLOAD CATALOGUE
          </a>
        </div>
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
