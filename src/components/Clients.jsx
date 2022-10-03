import cover from '../assets/dental-cover.jpg'
const Clients = () => (
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


);

export default Clients;
