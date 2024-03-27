import React from "react";
import { useDispatch } from "react-redux";
import { setSlider } from "../../Store/slices/sliderSlices";

import Filters from "../Filters/Filters";
import styles from "../../containers/Home/home.styles.scss";

const Locations = ({ locations }) => {
    
  const dispatch = useDispatch();

  return (
    <ul className={styles.locations}>
      {locations.map((location) => (
        <li key={location.id}>
          <div className={styles.cardsLoc}>
            <div
              className={styles.imgBox}
              style={{
                backgroundImage: `url('${
                  window.location.origin
                }/uploads/images/${
                  location.cottage.covers.find((x) => x.priority === 1)?.path ||
                  ""
                }')`,
              }}
            ></div>

            <div className={styles.content}>
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
  );
};

export default Locations;
