import cover from "../assets/surgical-cover.jpg";
import styles, { layout } from "../style";
import Button from "./Button";
import testPdf from "../../src/surgical.pdf";
import React from "react";
import Modal from "react-modal";

export default function CardDeal2() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      position: 'relative',
      height: '90vh',
      width: '90vw',
      transform: "translate(-50%, -50%)",
    },
    overlay: {zIndex: 1000}
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <section className={layout.section}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <iframe src={testPdf} style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, height: '100%', width: '100%'}}/>
      </Modal>
    
      <div className={layout.sectionImg}>
        <section className="app" id="app" data-current-media="book"     onClick={openModal}>
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


      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Go through our surgical <br className="sm:block hidden" /> catalogue
          easily.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
          aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
        </p>

        <button
          type="button"
          onClick={openModal}
          className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10`}
        >
          OPEN NOW
        </button>
      </div>

    </section>
  );
}
