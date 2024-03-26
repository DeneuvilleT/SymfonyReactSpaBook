import React from "react";
import Nav from "../Nav/Nav";
import Logo from "../../components/Logo/Logo";
import styles from "./header.styles.scss";

const Header = ({ headerDom }) => {
  const handleHideHeader = () => {
    headerDom.current.classList.toggle(styles.hide);
  };

  return (
    <>
      <Logo />
      <header ref={headerDom} className={styles.header}>
        <Nav handleHideHeader={handleHideHeader} />
      </header>
    </>
  );
};

export default Header;
