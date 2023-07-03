import React, { useState,useEffect } from "react";
import styles from "./Slider.module.css";

const Slider = ({ slides, interval }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageRendered, setImageRendered] = useState(false);

  useEffect(() => {
    setImageRendered(true);
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, interval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [ interval]);

  return (
    <>
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <img src={slide.image} alt={slide.caption} />
            <div className={styles.desc}>Amazing</div>
            
          </div>
        ))}
 <div
        className={styles.cont}
  
      >
        {slides.map((slide, index) => (
          <div key={index} onClick={() => setCurrentSlide(index)}>
            <div
              className={`${styles.autofill__input} ${
                (index === currentSlide) & imageRendered
                  ? styles.autofilled
                  : styles.autofill__input
              } `}
            ></div>
          </div>
        ))}
      </div>
      </div>
     
    </>
  );
};

export default Slider;
