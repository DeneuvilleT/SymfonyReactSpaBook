import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import styles from "./footer.styles.scss";

const Footer = () => {
  return (
    <>
      <div className={styles.reinsurance}>

        <div>
          <h3>
            Trouvez<br />nous
          </h3>

          <address>
            Azur Gardens, 4 Rue Chez Chabot <br />
            17460 RIOUX
          </address>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.733631479978!2d-0.7031512870695933!3d45.656170720487346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480106b7cc0a6ec5%3A0x2e47e8dea565f34e!2sAZUR%20GARDENS!5e0!3m2!1sfr!2sfr!4v1709745045453!5m2!1sfr!2sfr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSecAboutUs}>
            <h2>A propos</h2>
            <p>Retrouvez-nous sur les différents <br /> réseaux sociaux</p>
            <ul className={styles.footerSocialLinks}>
              <li><Link to={"/"}><Icon icon="icomoon-free:instagram" width="2em" height="2em" style={{ color: 'black' }} /></Link></li>
              <li><Link to={"/"}><Icon icon="icomoon-free:facebook2" width="2em" height="2em" style={{ color: 'black' }} /></Link></li>
            </ul>
          </div>
          <div className={styles.footerQuickLinks}>
            <h2>Support</h2>
            <ul>
              <li><Link to={"/"}>Mentions légales</Link></li>
              <li><Link to={"/"}>CGV</Link></li>
              <li><Link to={"/"}>Moyens de paiement</Link></li>
            </ul>
          </div>
          <div className={styles.footerQuickLinks}>
            <h2>Site</h2>
            <ul>
              <li><Link to={"/login"}>Connexion</Link></li>
              <li><Link to={"/login#register"}>Inscription</Link></li>
              <li><Link to={"/profile"}>Mon compte</Link></li>
              <li><Link to={"/"}>Accueil</Link></li>
            </ul>
          </div>
          <div className={styles.footerContact}>
            <h2>Nous contacter</h2>
            <ul>
              <li><a href="tel:0323565150"><Icon icon="bi:phone" width="1.2em" height="1.2em" style={{ color: 'black' }} />03.23.56.51.50</a></li>
              <li><a href="mailto:contact@cabaneetgiteaunaturel.com"><Icon icon="cib:mail-ru" width="1.2em" height="1.2em" style={{ color: 'black' }} />contact@cabaneetgiteaunaturel.com</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <div className={styles.footerCopyrightText}>
        <p><span>Copyright&nbsp;<Icon icon="la:copyright" width="1.2em" height="1.2em" style={{ color: '#555' }} />&nbsp;2024</span><span>Pause et nature</span><span>Tous droits réservés</span></p>
      </div>
    </>
  );
};

export default Footer;
