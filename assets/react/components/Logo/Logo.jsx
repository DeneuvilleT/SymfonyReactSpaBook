import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteLocations } from "../../Store/slices/locationsSlices";
import { hideHeader } from "../../utilities";

import styles from "./logo.styles.scss";

const Logo = ({ page }) => {
  const titleContainer = useRef(null);

  const dispatch = useDispatch();

  const handleBackToHome = () => {
    hideHeader(false);

    setTimeout(() => {
      dispatch(deleteLocations());
    }, 1000);
  };

  return (
    <Link
      to={"/"}
      ref={titleContainer}
      className={`${styles.logo} ${page === "login" ? styles.loginLogo : ""}`}
      onClick={() => {
        handleBackToHome();
      }}
    >
      <h1>
        <span>Cabane</span>
        <div>
          <span style={{ fontSize: "1.25em" }}>et</span>
          <span style={{ fontSize: "1.25em" }}>gîte</span>
          <span style={{ fontSize: "1.25em" }}>au</span>
          <span style={{ fontSize: "1.25em" }}>naturel</span>
        </div>
      </h1>
    </Link>
  );
};

export default Logo;
