import cover from "../assets/dental-cover.jpg";
import styles, { layout } from "../style";
import React from "react";

export default function CardDeal() {



  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo2}>
        <h2 className={styles.heading2} style={{textAlign: 'right'}}>
          Go through our dental <br className="sm:block hidden" /> catalogue
          easily.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`} style={{textAlign: 'right'}}>
          Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
          aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
        </p>

        <button
          type="button"
          onClick={() => window.location.href="/dental-catalogue"}
          className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10`}
        >
          OPEN NOW
        </button>
      </div>

      <div className={layout.sectionImg} id="product">
        <section className="app" id="app" data-current-media="book"  onClick={() => window.location.href="/dental-catalogue"} >
          <article className="media-container">
            <div className="book-wrapper">
              <div className="book">
                <div className="book__front">
                  <img src={cover} alt="cover" />
                </div>
                <div className="book__paper"></div>
                <div className="book__back"></div>
              </div>
              <div className="book-shadow"></div>
            </div>

            <div className="movie-wrapper">
              <div className="movie">
                <div className="movie__front">
                  <img src={cover} alt="cover" />
                </div>
                <div className="movie__edge"></div>
                <div className="movie__side"></div>
              </div>
              <div className="movie-shadow"></div>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
