import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Icon } from "@iconify/react";

import styles from "./footer.styles.scss";

const Footer = () => {
  const { isLog } = useSelector((state) => ({ ...state.auth }));

  return (
    <>
      <div className={styles.reassurance}>
        <div>
          <h3>
            <span>Trouvez</span>
            <br />
            <span>nous</span>
          </h3>

          <address>
            Pause et nature, 2 Rue Chez Chabot <br />
            17460 RIOUX
          </address>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.7438566742367!2d-0.7057089065955706!3d45.655965396504214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480106b7cfba3297%3A0xa8962e90c6a4ce45!2s2%20Rue%20de%20Chez%20Chabot%2C%2017460%20Rioux!5e0!3m2!1sfr!2sfr!4v1711875847016!5m2!1sfr!2sfr"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSecAboutUs}>
            <h2>A propos</h2>
            <p>
              Retrouvez-nous sur les différents <br /> réseaux sociaux
            </p>
            <ul className={styles.footerSocialLinks}>
              <li>
                <Link to={"/"}>
                  <Icon
                    icon="icomoon-free:instagram"
                    width="2em"
                    height="2em"
                    style={{ color: "black" }}
                  />
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <Icon
                    icon="icomoon-free:facebook2"
                    width="2em"
                    height="2em"
                    style={{ color: "black" }}
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerQuickLinks}>
            <h2>Support</h2>
            <ul>
              <li>
                <Link to={"qui-sommes-nous"}>Qui sommes-nous</Link>
              </li>
              <li>
                <Link to={"/mentions-legales"}>Mentions légales</Link>
              </li>
              <li>
                <Link to={"/conditions-generales-de-ventes"}>CGV</Link>
              </li>
              <li>
                <Link to={"/moyens-de-paiements"}>Moyens de paiement</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerQuickLinks}>
            <h2>Site</h2>
            <ul>
              <li>
                <Link to={"/login"}>Connexion</Link>
              </li>
              <li>
                <Link to={{ pathname: "/login", search: "?param=register" }}>
                  Inscription
                </Link>
              </li>
              <li>{isLog ? <Link to={"/profile"}>Mon compte</Link> : <></>}</li>
              <li>
                <Link to={"/"}>Accueil</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerContact}>
            <h2>Nous contacter</h2>
            <ul>
              <li>
                <a href="tel:0546931782">
                  <Icon
                    icon="bi:phone"
                    width="1.2em"
                    height="1.2em"
                    style={{ color: "black" }}
                  />
                  05.46.93.17.82
                </a>
              </li>
              <li>
                <a href="mailto:contact@cabaneetgiteaunaturel.com">
                  <Icon
                    icon="cib:mail-ru"
                    width="1.2em"
                    height="1.2em"
                    style={{ color: "black" }}
                  />
                  contact@cabaneetgiteaunaturel.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className={styles.footerCopyrightText}>
        <p id="section1">
          <span>
            Copyright&nbsp;
            <Icon
              icon="la:copyright"
              width="1.2em"
              height="1.2em"
              style={{ color: "#555" }}
            />
            &nbsp;2024
          </span>
          <span>Pause et nature</span>
          <span>Tous droits réservés</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
