import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

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
  const locationHook = useLocation();

  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);
  const [nbNight, setNbNight] = useState(0);
  const [nbTraveller, setNbTraveller] = useState(0);

  useEffect(() => {
    
    if (localStorage.getItem("location") && localStorage.getItem("dates")) {

      const localLocation = JSON.parse(localStorage.getItem("location"));
      setNbTraveller(localLocation[1].qtyTraveller);
      dispatch(setOneLocation(localLocation[0]));
      transformDates(datesChoices);
    }
  }, [locationHook]);

  const transformDates = (datesChoices) => {
    const dates = JSON.parse(datesChoices);

    const dateStart = new Date(dates[0]);
    const dateEnd = new Date(dates[1]);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = dateEnd - dateStart;

    setNbNight(Math.floor(differenceInMilliseconds / millisecondsPerDay));

    setStart(format(dateStart, "dd MMMM yyyy", { locale: fr }));
    setEnd(format(dateEnd, "dd MMMM yyyy", { locale: fr }));
  };

  return (
    <main className={styles.summary}>
      {locations.length !== 0 ? (
        <section>
          <h2>Récapitulatif de votre réservation :</h2>

          <p>
            {isLog &&
              infos.firstname.length !== 0 &&
              infos.lastname.length !== 0 ? (
              <>
                <b><span>{`${infos.lastname}`}</span> {`${infos.firstname}`}</b>, vous êtes sur le point de réserver :
              </>
            ) : (
              "Vous êtes sur le point de réserver :"
            )}
          </p>

          <article>

            <img
              alt={locations[0].cottage.name}
              src={`${window.location.origin}/uploads/images/${locations[0].cottage.covers.find((x) => x.priority === 1)
                ?.path || ""
                }`}
            />

            <div>
              <h3>{locations[0].cottage.name}</h3>

              <p>Du <b>{start}</b> au <b>{end}</b></p>
              <p>Pour un total de <b>{nbNight}</b> nuit(s)</p>
              <p>Pour <b>{nbTraveller}</b> personne(s)</p>
              <p>A <b>{(locations[0].cottage.price_one_night / 100).toString().replace(".", ",")} €</b> la nuit</p>
              <p>Pour un montant total de <b>{((locations[0].cottage.price_one_night * nbNight) / 100).toString().replace(".", ",")}€</b></p>
            </div>

          </article>

          <p>Voulez-vous modifier votre choix ? </p>

          <Link to={{ pathname: "/", search: "?param=modify" }}>modifier</Link>

          <aside>
            {isLog ? (
              <p>Si toutes ces informations sont exactes, vous pouvez procéder au paiement de la réservation en cliquant ci-dessous.</p>
            ) : (
              /**
               *  Procédure de paiement Stripe
               */
              <>
                <p>Vous n'êtes pas connecté. Vous devez posséder un compte et vous connecter pour finaliser la procédure de paiement.</p>
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
