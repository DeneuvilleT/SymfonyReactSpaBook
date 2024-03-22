import React from "react";
import Nav from "../Nav/Nav";

import styles from "./header.styles.scss";

const Header = ({ headerDom }) => {

  const handleHideHeader = () => {
    headerDom.current.classList.toggle(styles.hide);
  }

  return (
    <header ref={headerDom} className={styles.header}>
      <Nav handleHideHeader={handleHideHeader} />
    </header>
  );
};

export default Header;
