import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { resetPrivacy } from "../../Store/slices/locationsSlices";

import Form from "../Form/Form";

import Cookies from "js-cookie";
import styles from "../Slider/sliderContainer.styles.scss";

const Privacy = ({ notif, container, resetNotif }) => {
  const { privacy } = useSelector((state) => ({ ...state.location }));

  const dispatch = useDispatch();

  const [successContent, setSuccessContent] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [initResetContent, setInitResetContent] = useState(false);
  const [resetContent, setResetContent] = useState(false);
  const [privacyContent, setPrivacyContent] = useState(null);
  const [tokenReset, setTokenReset] = useState("");
  const sliderDom = useRef(null);

  useEffect(() => {
    if (privacy !== null) {
      setPrivacyContent(privacy);
      document.body.style.overflowY = "hidden";
    } else if (notif !== null && notif !== undefined) {
      switch (notif) {
        case "error_buy":
          setErrorContent(true);
          break;

        case "init_pass":
          setInitResetContent(true);

          const tokenResetSplit = location.pathname.split("/");
          setTokenReset(tokenResetSplit[tokenResetSplit.length - 1]);
          break;

        case "reset_pass":
          setResetContent(true);
          break;

        default:
          const stripeToken = Cookies.get("tokenAfterBuy");
          if (stripeToken === container.dataset.back) {
            setSuccessContent(true);
          } else {
            setErrorContent(true);
          }
          break;
      }

      document.body.style.overflowY = "hidden";
    }
  }, [privacy, notif]);

  const handleClose = () => {
    if (notif === null || notif === undefined) {
      dispatch(resetPrivacy());
      setPrivacyContent(null);
    } else {
      if (container.dataset.back) {
        container.removeAttribute("data-back");
      }

      setResetContent(false);
      setInitResetContent(false);
      setSuccessContent(false);
      setErrorContent(false);
    }

    resetNotif(null);
    document.body.style.overflowY = "auto";
  };

  return (
    <div
      className={`${styles.sliderContainer} ${
        successContent || errorContent || resetContent || initResetContent
          ? styles.not_privacy
          : ""
      }`}
      style={{
        display:
          privacyContent ||
          successContent ||
          errorContent ||
          resetContent ||
          initResetContent
            ? "flex"
            : "none",
      }}
      onClick={handleClose}
    >
      <Icon icon="fontisto:close-a" />
      <div className={`${styles.slider} ${styles.privacy}`} ref={sliderDom}>
        {privacyContent ? (
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          /* PRIVACY CONTENT */
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          <p
            className={styles.privacy}
            dangerouslySetInnerHTML={{
              __html: privacyContent,
            }}
          />
        ) : successContent ? (
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          /* SUCCESS PAIEMENT */
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
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
                <a href="tel:0546931782">
                  05 46 93 17 82
                  <Icon
                    style={{ marginTop: "-3px" }}
                    icon="fluent:phone-32-regular"
                  />
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
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          /* ERROR PAIEMENT */
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
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
                <a href="tel:0546931782">
                  05 46 93 17 82
                  <Icon
                    style={{ marginTop: "-3px" }}
                    icon="fluent:phone-32-regular"
                  />
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
            <Link to={"/"} onClick={handleClose}>
              Retour à la page d'accueil <Icon icon="teenyicons:home-solid" />
            </Link>
          </section>
        ) : initResetContent ? (
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          /* INIT RESET PASSWORD */
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          <section
            className={styles.reset}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Veuillez entrer votre nouveau mot de passe</h3>
            <Form
              url={`/password/reset/${tokenReset}`}
              btnSubmit={"Envoyer"}
              after={false}
              inputs={{
                password: {
                  label: "Nouveau mot de passe",
                  name: "password",
                  type: "password",
                },
                confirm_password: {
                  label: "Confirmer votre mot de passe",
                  name: "confirm_password",
                  type: "password",
                },
              }}
            />
          </section>
        ) : resetContent ? (
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          /* RESET PASSWORD */
          /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
          <section className={styles.success_reset}>
            <h2>Félicitaions votre mot de passe a bien été changé !</h2>
            <p>
              Vous pouvez également dés à présent vous reconnecter avec votre
              nouveau mot de passe.
            </p>
            <Link to={"/login"}>
              Connexion <Icon icon="bxs:user" />
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
