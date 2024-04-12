import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setOneLocation } from "../../Store/slices/locationsSlices";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Icon } from "@iconify/react";

import styles from "./summary.styles.scss";

const Summary = () => {
  const { datesChoices, locations, isLog, infos } = useSelector((state) => ({
    ...state.location,
    ...state.auth,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);

  useEffect(() => {
    if (locations.length !== 0) {
      transformDates(datesChoices);
    } else if (localStorage.getItem("location")) {
      dispatch(setOneLocation(JSON.parse(localStorage.getItem("location"))[0]));
      transformDates(datesChoices);
    }
  }, [locations, datesChoices]);

  const transformDates = (datesChoices) => {
    const dates = JSON.parse(datesChoices);

    const dateStart = new Date(dates[0]);
    const dateEnd = new Date(dates[1]);

    setStart(format(dateStart, "dd MMMM yyyy", { locale: fr }));
    setEnd(format(dateEnd, "dd MMMM yyyy", { locale: fr }));
  };

  return (
    <main className={styles.summary}>
      {locations.length !== 0 ? (
        <section>
          <h1>Récapitulatif de votre réservation</h1>
          <p>
            {isLog &&
            infos.firstname.length !== 0 &&
            infos.lastname.length !== 0
              ? `${infos.firstname} ${infos.lastname}, vous êtes sur le point de réserver :`
              : "Vous êtes sur le point de réserver :"}
          </p>
          <h2>{locations[0].cottage.name}</h2>
          <img
            alt={locations[0].cottage.name}
            src={`${window.location.origin}/uploads/images/${
              locations[0].cottage.covers.find((x) => x.priority === 1)?.path ||
              ""
            }`}
          />
          <p>
            Du {start} au {end}
          </p>
          <p>Voulez-vous modifier votre choix ? </p>
          <Link to={"/"}>modifier</Link>
          <aside>
            {isLog ? (
              <p>
                Si toutes ces informations sont exactes, vous pouvez procéder au
                paiement de la réservation en cliquant ci-dessous.
              </p>
            ) : (
              /**
               *  Procédure de paiement Stripe
               */
              <>
                <p>
                  Vous n'êtes pas connecté. Vous devez posséder un compte et
                  vous connecter pour finaliser la procédure de paiement.
                </p>
                <Link to={"/login"}>se connecter</Link>
                &nbsp;ou&nbsp;
                <Link to={"/login#register"}>s'inscrire</Link>
              </>
            )}
          </aside>
        </section>
      ) : (
        <p>Vous n'avez sélectionné aucun hébergement</p>
      )}
    </main>
  );
};

export default Summary;
