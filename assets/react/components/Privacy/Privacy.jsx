import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { resetPrivacy } from "../../Store/slices/locationsSlices";

import Cookies from "js-cookie";
import styles from "../Slider/sliderContainer.styles.scss";

const Privacy = ({ success, container }) => {
  const { privacy } = useSelector((state) => ({ ...state.location }));

  const [successContent, setSuccessContent] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [privacyContent, setPrivacyContent] = useState(null);
  const sliderDom = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (privacy !== null) {
      setPrivacyContent(privacy);
      document.body.style.overflowY = "hidden";
    } else if (success !== null && success !== undefined) {

      if (success === "error_buy") {
        setErrorContent(true);
      } else {

        const stripeToken = Cookies.get("tokenAfterBuy");
        if (stripeToken === container.dataset.back) {
          setSuccessContent(true);
        } else {
          setErrorContent(true);
        }
      }

      document.body.style.overflowY = "hidden";
    }
  }, [privacy, success]);

  const handleClose = () => {
    if (success === null || success === undefined) {
      dispatch(resetPrivacy());
      setPrivacyContent(null);
    } else {

      if (container.dataset.back) {
        container.removeAttribute("data-back");
      }

      setSuccessContent(false);
      setErrorContent(false);
    }
    document.body.style.overflowY = "auto";
  };

  return (
    <div
      className={`${styles.sliderContainer} ${
        successContent || errorContent ? styles.not_privacy : ""
      }`}
      style={{
        display:
          privacyContent || successContent || errorContent ? "flex" : "none",
      }}
      onClick={handleClose}
    >
      <Icon icon="fontisto:close-a" />
      <div className={`${styles.slider} ${styles.privacy}`} ref={sliderDom}>
        {privacyContent ? (
          <p
            className={styles.privacy}
            dangerouslySetInnerHTML={{
              __html: privacyContent,
            }}
          />
        ) : successContent ? (
          <section className={styles.success}>
            <h2>Félicitations pour votre réservation !</h2>
            <p>
              Merci d'avoir choisi notre site pour réserver votre prochain
              séjour. Nous sommes ravis de vous accueillir bientôt dans l'un de
              nos hébergements.
            </p>
            <p>
              Si vous avez des questions ou toutre autres demandes, n'hésitez
              pas à nous contacter.
              <br />
              Nous ferons tout notre possible pour rendre votre séjour
              inoubliable.
              <span>
                <a href="mailto:contact@cabaneetgiteaunaturel.com">
                  contact@cabaneetgiteaunaturel.com
                  <Icon icon="lets-icons:e-mail" />
                </a>
                <a href="tel:0323565150" style={{ alignItems: "flex-end" }}>
                  03 23 56 51 50
                  <Icon icon="fluent:phone-32-regular" />
                </a>
              </span>
            </p>
            <p>
              Vous pouvez également dés à présent consulter les détails de votre
              <br />
              réservation sur votre page de profil en cliquant sur le lien
              ci-dessous.
            </p>
            <Link to={"/profile"}>
              Mon compte <Icon icon="bxs:user" />
            </Link>
            <p>
              <em>Merci et à bientôt !</em>
            </p>
            <Icon icon="meteocons:sun-hot-fill" />
          </section>
        ) : errorContent ? (
          <section className={styles.error}>
            <h2>Désolé mais votre paiement a échoué</h2>
            <p>
              Nous avons rencontré un problème lors du traitement de votre
              paiement.
              <br />
              Veuillez vérifier les informations que vous avez fournies et
              réessayer.
            </p>
            <p>
              Si le problème persiste, n'hésitez pas à nous contacter pour
              obtenir de l'aide.
              <br />
              Nous sommes là pour vous aider à résoudre cette situation le plus
              rapidement possible.
              <span>
                <a href="mailto:contact@cabaneetgiteaunaturel.com">
                  contact@cabaneetgiteaunaturel.com
                  <Icon icon="lets-icons:e-mail" />
                </a>
                <a href="tel:0323565150" style={{ alignItems: "flex-end" }}>
                  03 23 56 51 50
                  <Icon icon="fluent:phone-32-regular" />
                </a>
              </span>
            </p>

            <p>
              Vous pouvez retourner à l'accueil en cliquant sur le bouton
              ci-dessous.
              <br />
              Nous vous remercions de votre compréhension et espérons avoir
              l'occasion de vous accueillir prochainement.
            </p>
            <Link
              to={"/"}
              onClick={handleClose}
              style={{ alignItems: "flex-end" }}
            >
              Retour à la page d'accueil <Icon icon="teenyicons:home-solid" />
            </Link>
          </section>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Privacy;
