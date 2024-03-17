import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetSlider } from "../../Store/slices/sliderSlices";
import { Icon } from "@iconify/react";

import styles from "./sliderContainer.styles.scss";

const Slider = () => {
  const { slides } = useSelector((state) => ({ ...state.slider }));

  const [sliderOn, setSliderOn] = useState(false);
  const sliderDom = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (slides.length !== 0) {
      setSliderOn(true);
      document.body.style.overflowY = 'hidden';
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

  const handleClose = () => {
    setSliderOn(false);
    dispatch(resetSlider());
    document.body.style.overflowY = 'auto';
  }

  return (
    <div className={styles.sliderContainer} style={{ display: sliderOn ? "flex" : "none" }} onClick={() => handleClose()}>
      <Icon icon="fontisto:close-a" />
      <div className={styles.slider} ref={sliderDom} >
        {sliderOn ? (
          slides.length !== 0 ? (
            slides.map((x, index) => (
              <div key={index} className={styles.sliderSlides} style={{ "--img": `url('/uploads/images/${x.path}')` }} onClick={(e) => e.stopPropagation()}>
                <div className={styles.sliderContent}>
                  {/* Légende ? */}
                  {/* <h2>Test</h2> */}
                  {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, nam. Repellendus numquam a, in quisquam distinctio odio. Maxime unde architecto cumque ipsam? Libero omnis ex velit, optio porro dolor quod!</p> */}
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
        <span onClick={(e) => { handlePrev(); e.stopPropagation() }}></span>
        <span onClick={(e) => { handleNext(); e.stopPropagation() }}></span>
      </div>
    </div>
  );
};

export default Slider;
