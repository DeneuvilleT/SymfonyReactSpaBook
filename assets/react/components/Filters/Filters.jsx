import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { setOneLocation } from "../../Store/slices/locationsSlices";
import { hideHeader } from "../../utilities";

import styles from "../../containers/Home/home.styles.scss";

const Filters = ({ location }) => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const dispatch = useDispatch();

  const btnBook = useRef(null);

  const [content, setContent] = useState("Réserver");

  const locationHook = useLocation();

  useEffect(() => {
    if (locationHook.search === "?param=modify") {
      selectLocation(btnBook.current);
    }
    setContent(
      !choiceLocation
        ? "Réserver"
        : `${locations[0].cottage.price_one_night / 100} €`
    );
  }, [locationHook]);

  const selectLocation = () => {
    dispatch(setOneLocation(location));
    hideHeader();

    setContent(`${location.cottage.price_one_night / 100} €`);
  };

  return (
    <ul>
      <div
        role="figure"
        className={`${!location.is_available ? styles.locationOff : ""} ${
          choiceLocation ? styles.locationActive : ""
        }`}
      >
        <span
          ref={btnBook}
          className={`${choiceLocation ? styles.locationActive : ""}`}
          onClick={location.is_available ? selectLocation : null}
        >
          {content !== "Réserver" ? (
            <>
              <strong>{content.replace(".", ",")}</strong>
              <br />
              la nuit
            </>
          ) : (
            <>{location.is_available ? content : "Indisponible"}</>
          )}
        </span>
      </div>
      {location.has_garden ? (
        <li>
          <Icon icon="guidance:garden" style={{ color: "#333" }} />
          <span>Vue sur jardin</span>
        </li>
      ) : (
        <></>
      )}
      {location.has_pool ? (
        <li>
          <Icon icon="material-symbols-light:pool" style={{ color: "#333" }} />
          <span>Picine protégée</span>
        </li>
      ) : (
        <></>
      )}
      {location.has_sanitary ? (
        <li>
          <Icon icon="bi:badge-wc" style={{ color: "#333" }} />
          <span>Sanitaire indépendant</span>
        </li>
      ) : (
        <></>
      )}
      {location.animal_accpeted ? (
        <li>
          <Icon icon="ic:round-pets" style={{ color: "#333" }} />
          <span>Animaux acceptés</span>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Filters;
