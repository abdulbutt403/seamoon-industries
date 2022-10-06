import cover from '../assets/dental-cover.jpg'
const Clients = () => (
  <section className="app" id="app" data-current-media="book">
    
    <article className="media-container">
        <div className="book-wrapper">
            <div className="book">
                <div className="book__front">
                    <img src={cover} alt="cover"/>
                </div>
                <div className="book__paper"></div>
                <div className="book__back"></div>
            </div>
            <div className="book-shadow"></div>
        </div>
        
        <div className="movie-wrapper">
            <div className="movie">
                <div className="movie__front">
                    <img src={cover} alt="cover"/>
                </div>
                <div className="movie__edge"></div>
                <div className="movie__side"></div>
            </div>
            <div className="movie-shadow"></div>
        </div>
    </article>
    
  
    
</section>


);

export default Clients;
