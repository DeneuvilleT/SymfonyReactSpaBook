import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

import styles from "../Slider/sliderContainer.styles.scss";
import { resetPrivacy } from "../../Store/slices/locationsSlices";

const Privacy = () => {
  const { privacy } = useSelector((state) => ({ ...state.location }));

  const [privacyContent, setPrivacyContent] = useState(null);
  const sliderDom = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (privacy !== null) {
      setPrivacyContent(privacy);
      document.body.style.overflowY = "hidden";
    }
  }, [privacy]);

  const handleClose = () => {
    setPrivacyContent(null);
    dispatch(resetPrivacy());
    document.body.style.overflowY = "auto";
  };

  return (
    <div
      className={styles.sliderContainer}
      style={{ display: privacyContent ? "flex" : "none" }}
      onClick={() => handleClose()}
    >
      <Icon icon="fontisto:close-a" />
      <div className={`${styles.slider} ${styles.privacy}`} ref={sliderDom}>
        {privacyContent ? (
          <p className={styles.privacy}
            dangerouslySetInnerHTML={{
              __html: privacyContent,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Privacy;
