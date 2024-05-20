import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { setOneLocation } from "../../Store/slices/locationsSlices";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Icon } from "@iconify/react";
import axios from "axios";

import styles from "./summary.styles.scss";

const Summary = () => {
  const { datesChoices, locations, isLog, infos } = useSelector((state) => ({
    ...state.location,
    ...state.auth,
  }));
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const dispatch = useDispatch();
  const locationHook = useLocation();

  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);
  const [nbNight, setNbNight] = useState(0);
  const [nbTraveller, setNbTraveller] = useState(0);
  const [icone, setIcone] = useState("bi:stripe");

  useEffect(() => {
    if (localStorage.getItem("location") && localStorage.getItem("dates")) {
      const localLocation = JSON.parse(localStorage.getItem("location"));

      setNbTraveller(localLocation[1].qtyTraveller);
      dispatch(setOneLocation(localLocation[0]));
      transformDates(datesChoices);
    }
  }, [locationHook]);

  const transformDates = (datesChoices) => {
    const datesStorage = JSON.parse(datesChoices);
    const dateStart = new Date(datesStorage[0]);
    const dateEnd = new Date(datesStorage[1]);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = dateEnd - dateStart;

    setNbNight(Math.floor(differenceInMilliseconds / millisecondsPerDay));

    setStart(format(dateStart, "dd MMMM yyyy", { locale: fr }));
    setEnd(format(dateEnd, "dd MMMM yyyy", { locale: fr }));
  };

  const checkout = async (e) => {
    e.preventDefault();

    setIcone("svg-spinners:90-ring-with-bg");

    let locationParse = JSON.parse(localStorage.getItem("location"));

    const combining = /[\u0300-\u036F]/g;

    const objectLocation = [
      {
        id: locationParse[0].id,
        name: locationParse[0].cottage.name
          .normalize("NFKD")
          .replace(combining, ""),
      },
      {
        qtyTraveller: locationParse[1].qtyTraveller,
      },
    ];

    const datasBooking = {
      location: objectLocation,
      dates: JSON.parse(datesChoices),
      price: locations[0].cottage.price_one_night * nbNight,
    };

    try {
      const response = await axios.post(
        `/api/v1/stripe/checkout/${infos.uid}`,
        JSON.stringify(datasBooking),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        location.href = response.data;
      } else {
        console.error("Erreur lors de la création de la session de paiement");
      }
    } catch (error) {
      console.log(error.response.data.message, error);
    }
  };

  return (
    <main className={styles.summary}>
      {locations.length !== 0 ? (
        <section>
          <h2>Récapitulatif de votre réservation :</h2>

          <article>
            <div>
              <p>
                {isLog &&
                infos.firstname.length !== 0 &&
                infos.lastname.length !== 0 ? (
                  <>
                    <b>{infos.firstname}</b>, vous êtes sur le point de réserver
                    :
                  </>
                ) : (
                  "Vous êtes sur le point de réserver :"
                )}
              </p>

              <h3>{locations[0].cottage.name}</h3>

              <img
                alt={locations[0].cottage.name}
                src={`${window.location.origin}/uploads/images/${
                  locations[0].cottage.covers.find((x) => x.priority === 1)
                    ?.path || ""
                }`}
              />
            </div>

            <div>
              <p>
                Votre arrivée est prévue le : <b>{start}</b>
              </p>
              <p>
                Votre départ est prévue le : <b>{end}</b>
              </p>
              <p>
                <span>
                  <Icon
                    icon="solar:user-hand-up-linear"
                    width="3.25em"
                    height="3.25em"
                    style={{ color: "#444" }}
                  />
                  <b>{nbTraveller} personne(s)</b>
                </span>

                <span>
                  <Icon
                    icon="game-icons:night-sleep"
                    width="3em"
                    height="3em"
                    style={{ color: "#444" }}
                  />
                  <b>{nbNight} nuit(s) </b>
                </span>

                <span>
                  <Icon
                    icon="material-symbols:euro"
                    width="3.25em"
                    height="3.25em"
                    style={{ color: "#444" }}
                  />
                  <b>
                    {(locations[0].cottage.price_one_night / 100)
                      .toString()
                      .replace(".", ",")}{" "}
                    € la nuit
                  </b>
                </span>
              </p>

              <p>
                Ce séjour vous sera facturé :{" "}
                <b>
                  {((locations[0].cottage.price_one_night * nbNight) / 100)
                    .toString()
                    .replace(".", ",")}
                  &nbsp;€
                </b>
              </p>
            </div>
          </article>

          <article>
            <p>
              Voulez-vous modifier votre réservation avant validation ?{" "}
              <Link to={{ pathname: "/", search: "?param=modify" }}>
                modifier
              </Link>
            </p>

            <p>
              {isLog ? (
                <>
                  <span>
                    Si toutes ces informations s'avèrent exactes, vous pouvez
                    effectuer le paiement de la réservation en cliquant sur le
                    lien ci-dessous.
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Vous n'êtes pas connecté, vous devez posséder un compte et
                    vous connecter pour finaliser la procédure de paiement.
                  </span>
                </>
              )}
            </p>

            {isLog ? (
              <Link to={"/summary"} onClick={checkout}>
                Procéder au paiement via Stripe
                <Icon
                  icon={icone}
                  width="1.4em"
                  height="1.4em"
                  style={{ color: "white" }}
                />
              </Link>
            ) : (
              <div>
                <aside>
                  Vous pouvez vous connecter en cliquant sur le bouton ci
                  dessous
                  <Link to={"/login"}>se connecter</Link>
                </aside>

                <aside>
                  Vous pouvez vous inscrire en cliquant sur le bouton ci dessous
                  <Link to={{ pathname: "/login", search: "?param=register" }}>
                    s'inscrire
                  </Link>
                </aside>
              </div>
            )}
          </article>
        </section>
      ) : (
        <section>
          <h3>Vous n'avez sélectionné aucun hébergement</h3>
          <p>
            Veuillez rechercher un hébergement dans la barre de recherche juste
            au dessus.
          </p>

          <Icon
            icon="bi:house-slash"
            width="100"
            height="100"
            style={{ color: "#2f2f2f" }}
          />
        </section>
      )}
    </main>
  );
};

export default Summary;
