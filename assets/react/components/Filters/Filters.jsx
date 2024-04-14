import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { setOneLocation } from "../../Store/slices/locationsSlices";
import { hideHeader } from "../../utilities";

import styles from "../../containers/Home/home.styles.scss";

const Filters = ({ location }) => {
  const dispatch = useDispatch();

  const btnBook = useRef(null);

  const [content, setContent] = useState("Réserver");

  const locationHook = useLocation();

  useEffect(() => {
    if (locationHook.search === "?param=modify") {
      selectLocation(btnBook.current);
    }
  }, [locationHook]);

  const selectLocation = (node) => {
    dispatch(setOneLocation(location));
    hideHeader();

    setContent(`${location.cottage.price_one_night / 100} €`);
    node.parentElement.classList.toggle(styles.locationActive);
    node.classList.toggle(styles.locationActive);
  };

  return (
    <ul>
      <div
        role="figure"
        className={`${!location.is_available ? styles.locationOff : ""}`}
      >
        <span
          ref={btnBook}
          onClick={(e) =>
            location.is_available ? selectLocation(e.currentTarget) : null
          }
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
          Vue sur jardin
        </li>
      ) : (
        <></>
      )}
      {location.has_pool ? (
        <li>
          <Icon icon="material-symbols-light:pool" style={{ color: "#333" }} />
          Picine protégée
        </li>
      ) : (
        <></>
      )}
      {location.has_sanitary ? (
        <li>
          <Icon icon="bi:badge-wc" style={{ color: "#333" }} />
          Sanitaire indépendant
        </li>
      ) : (
        <></>
      )}
      {location.animal_accpeted ? (
        <li>
          <Icon icon="ic:round-pets" style={{ color: "#333" }} />
          Animaux acceptés
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Filters;
