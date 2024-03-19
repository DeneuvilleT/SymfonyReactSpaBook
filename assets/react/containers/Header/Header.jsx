import React, { useRef, useEffect } from "react";
import Nav from "../Nav/Nav";

import styles from "./header.styles.scss";

const Header = () => {

  const headerDom = useRef(null);

  useEffect(() => {
    const handleLinkClick = () => {
      if (location.hash === '#/login#register' || location.hash === '#/login') {
        headerDom.current.classList.add(styles.hide);
      } else {
        headerDom.current.classList.remove(styles.hide);
      }
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    window.addEventListener('click', handleLinkClick);
  
    return () => {
      window.removeEventListener('click', handleLinkClick);
    };
  }, [headerDom]);

  const handleHideHeader = () => {
    headerDom.current.classList.toggle(styles.hide);

    // Quand scroll souris haut retirer la classe
  }

  return (
    <header ref={headerDom} className={styles.header}>
      <Nav handleHideHeader={handleHideHeader} />
    </header>
  );
};

export default Header;
