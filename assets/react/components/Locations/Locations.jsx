import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { setSlider } from "../../Store/slices/sliderSlices";

import PeriodsBooking from "../PeriodsBooking/PeriodsBooking";
import Filters from "../Filters/Filters";

import styles from "../../containers/Home/home.styles.scss";

const Locations = ({ locationsDatas }) => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const dispatch = useDispatch();

  const locationContainer = useRef(null);

  const locationHook = useLocation();

  useEffect(() => {
    if (locationHook.search === "?param=modify") {
      locationContainer.current.classList.add(styles.speed, styles.appear);
    } else {
      if (locations.length !== 0) {
        setTimeout(() => {
          locationContainer.current.classList.add(styles.appear);
        }, 2000);
      }
    }
  }, [locations, locationHook]);

  return (
    <>
      <ul ref={locationContainer} className={styles.locations}>
        {locationsDatas.map((location) => (
          <li key={location.id}>
            <div className={styles.cardsLoc}>
              <div
                className={styles.imgBox}
                style={{
                  backgroundImage: `url('${
                    window.location.origin
                  }/uploads/images/${
                    location.cottage.covers.find((x) => x.priority === 1)
                      ?.path || ""
                  }')`,
                }}
              ></div>

              <div
                className={`${styles.content} ${
                  choiceLocation ? styles.contentActive : ""
                }`}
              >
                <span>
                  <h3>{location.cottage.name}</h3>
                </span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: location.cottage.description,
                  }}
                />
                <Filters location={location} />
              </div>
            </div>

            {location.cottage.covers.length !== 0 ? (
              <ul className={styles.thumbails}>
                {location.cottage.covers.map((cover) => (
                  <li
                    onClick={() => {
                      dispatch(setSlider(location.cottage.covers));
                    }}
                    key={cover.id}
                    style={{
                      backgroundImage: `url('${window.location.origin}/uploads/images/${cover.path}')`,
                    }}
                  ></li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <PeriodsBooking />
    </>
  );
};

export default Locations;
