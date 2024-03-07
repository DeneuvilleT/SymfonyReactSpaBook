import React from "react";
import styles from "./footer.styles.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a href="/">Nous contacter</a>
        </li>
        <li>
          <a href="/">Nous trouver</a>
        </li>
        <li>
          <a href="/">Mentions légales</a>
        </li>
        <li>
          <a href="/">Conditions générales de vente.</a>
        </li>
        <li>
          <a href="/">Qui sommes-nous ?</a>
        </li>
      </ul>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.733631479978!2d-0.7031512870695933!3d45.656170720487346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480106b7cc0a6ec5%3A0x2e47e8dea565f34e!2sAZUR%20GARDENS!5e0!3m2!1sfr!2sfr!4v1709745045453!5m2!1sfr!2sfr"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <article>
        <address>
          Azur Gardens <br />
          4, rue Chez Chabot <br />
          17460 RIOUX
        </address>
      </article>
    </footer>
  );
};

export default Footer;
