import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { resetPrivacy } from "../../Store/slices/locationsSlices";

import styles from "../Slider/sliderContainer.styles.scss";

const Privacy = ({ success }) => {
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
      console.log("first", success);
      if (success === "error_buy") {
        setErrorContent(true);
      } else {
        setSuccessContent(true);
      }
      document.body.style.overflowY = "hidden";
    }
    console.log(success, successContent, errorContent);
  }, [privacy, success]);

  const handleClose = () => {
    if (success === null || success === undefined) {
      dispatch(resetPrivacy());
      setPrivacyContent(null);
    } else {
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
                  contact@cabaneetgiteaunaturel.com{" "}
                  <Icon icon="lets-icons:e-mail" />
                </a>
                <a href="tel:0323565150">
                  03 23 56 51 50 <Icon icon="fluent:phone-32-regular" />
                </a>
              </span>
            </p>
            <p>
              Vous pouvez également dés à présent consulter les détails de votre<br />
              réservation sur votre page de profil en cliquant sur le lien
              ci-dessous.
            </p>
            <Link to={"/profile"}>
              Votre page de profil <Icon icon="bxs:user" />
            </Link>
            <p>
              <em>Merci et à bientôt !</em>
            </p>
            <Icon icon="meteocons:sun-hot-fill" />
          </section>
        ) : errorContent ? (
          <section className={styles.error}>
            <h2>Désolé, votre paiement a échoué.</h2>
            <p>
              Nous avons rencontré un problème lors du traitement de votre
              paiement. Veuillez vérifier les informations que vous avez
              fournies et réessayer.
            </p>
            <p>
              Si le problème persiste, n'hésitez pas à nous contacter pour
              obtenir de l'aide. Nous sommes là pour vous aider à résoudre cette
              situation le plus rapidement possible.
            </p>

            <p>
              Nous vous remercions de votre compréhension et espérons avoir
              l'occasion de vous accueillir bientôt.
            </p>
          </section>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Privacy;
