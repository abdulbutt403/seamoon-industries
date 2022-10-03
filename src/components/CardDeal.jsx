import cover from '../assets/dental-cover.jpg'
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Go through our dental <br className="sm:block hidden" /> catalogue easily.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
        aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
      </p>

      <Button title={`OPEN NOW`} styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
    <section class="app" id="app" data-current-media="book">
    
    <article class="media-container">
        <div class="book-wrapper">
            <div class="book">
                <div class="book__front">
                    <img src={cover} alt="cover"/>
                </div>
                <div class="book__paper"></div>
                <div class="book__back"></div>
            </div>
            <div class="book-shadow"></div>
        </div>
        
        <div class="movie-wrapper">
            <div class="movie">
                <div class="movie__front">
                    <img src={cover} alt="cover"/>
                </div>
                <div class="movie__edge"></div>
                <div class="movie__side"></div>
            </div>
            <div class="movie-shadow"></div>
        </div>
    </article>
    
  
    
</section>
    </div>
  </section>
);

export default CardDeal;
