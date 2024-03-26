import React from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import { setOneLocation } from "../../Store/slices/locationsSlices";

import styles from "../../containers/Header/header.styles.scss";

const Filters = ({ location }) => {
  const dispatch = useDispatch();

  const selectLocation = () => {
    const headerDom = document.querySelector("header");
    headerDom.classList.toggle(styles.hide);

    dispatch(setOneLocation(location));
  };

  return (
    <ul>
      <div role="figure">
        <span onClick={() => selectLocation()}>Réserver</span>
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
