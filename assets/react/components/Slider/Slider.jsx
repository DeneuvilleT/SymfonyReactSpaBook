import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./sliderContainer.styles.scss";

const Slider = () => {
  const { slides } = useSelector((state) => ({ ...state.slider }));

  const [sliderOn, setSliderOn] = useState(false);
  const sliderDom = useRef(null);

  useEffect(() => {
    if (slides.length !== 0) {
      setSliderOn(true);
    }
  }, [slides]);

  const handlePrev = () => {
    const slidesDom = document.querySelectorAll(`.${styles.sliderSlides}`);
    sliderDom.current.appendChild(slidesDom[0]);
  };

  const handleNext = () => {
    const slidesDom = document.querySelectorAll(`.${styles.sliderSlides}`);
    sliderDom.current.prepend(slidesDom[slidesDom.length - 1]);
  };

  return (
    <div className={styles.sliderContainer} style={{ display: sliderOn ? "flex" : "none" }}>
      <div className={styles.slider} ref={sliderDom}>
        {sliderOn ? (
          slides.length !== 0 ? (
            slides.map((x, index) => (
              <div key={index} className={styles.sliderSlides} style={{ "--img": `url('/uploads/images/${x.path}')` }}>
                <div className={styles.sliderContent}>
                  {/* Légende ? */}
                  <h2>Test</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, nam. Repellendus numquam a, in quisquam distinctio odio. Maxime unde architecto cumque ipsam? Libero omnis ex velit, optio porro dolor quod!</p>
                </div>
              </div>
            ))
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>

      <div className={styles.buttons}>
        <span onClick={() => handlePrev()}></span>
        <span onClick={() => handleNext()}></span>
      </div>
    </div>
  );
};

export default Slider;
