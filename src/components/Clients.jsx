import { clients } from "../constants";
import styles from "../style";

const Clients = () => (
  <section class="app" id="app" data-current-media="book">
    
    <article class="media-container">
        <div class="book-wrapper">
            <div class="book">
                <div class="book__front">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/91-j2UzZW4L.jpg" alt="cover"/>
                </div>
                <div class="book__paper"></div>
                <div class="book__back"></div>
            </div>
            <div class="book-shadow"></div>
        </div>
        
        <div class="movie-wrapper">
            <div class="movie">
                <div class="movie__front">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729/2019-Annihilation-DVD-and-Bluray-Cover-UK-and-USA-CST1.jpg" alt="cover"/>
                </div>
                <div class="movie__edge"></div>
                <div class="movie__side"></div>
            </div>
            <div class="movie-shadow"></div>
        </div>
    </article>
    
  
    
</section>


);

export default Clients;
