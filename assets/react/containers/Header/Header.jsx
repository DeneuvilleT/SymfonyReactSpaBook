import React from "react";
import Nav from "../Nav/Nav";
import Logo from "../../components/Logo/Logo";
import styles from "./header.styles.scss";

const Header = ({ headerDom }) => {
  return (
    <>
      <Logo />
      <header ref={headerDom} className={styles.header}>
        <Nav />
      </header>
    </>
  );
};

export default Header;
