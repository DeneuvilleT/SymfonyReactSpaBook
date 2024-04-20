import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Icon } from "@iconify/react";

import {
  setDatesLocation,
  setOnPrivacy,
} from "../../Store/slices/locationsSlices";

import Calendar from "../Calendar/Calendar";
import styles from "./periodsBooking.styles.scss";
import { creaDomElem } from "../../utilities";

const PeriodsBooking = () => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const period = useRef(null);
  const btnPrivacy = useRef(null);
  const contentTraveller = useRef(null);

  const [ready, setReady] = useState(false);
  const [qtyTraveller, setQtyTraveller] = useState(0);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [perdiodsStartUpdated, setPerdiodsStartUpdated] = useState(null);
  const [perdiodsEndUpdated, setPerdiodsEndUpdated] = useState(null);

  const [dateEndSelectionnee, setDateEndSelectionnee] = useState(null);
  const [dateStartSelectionnee, setDateStartSelectionnee] = useState(null);

  const [periodsStart, setPeriodsStart] = useState([]);
  const [periodsEndForArrivalDate, setPeriodsEndForArrivalDate] = useState([]);
  const [periodsEndForDepartureDate, setPeriodsEndForDepartureDate] = useState(
    []
  );

  useEffect(() => {
    if (dateEndSelectionnee !== null && perdiodsStartUpdated !== null) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [dateEndSelectionnee, perdiodsStartUpdated]);

  useEffect(() => {
    if (choiceLocation) {
      period.current.classList.add(styles.activeBooking);
      convertTimestamp(locations[0].cottage.periods);
      buildSelectTraveller();
    } else {
      period.current.classList.remove(styles.activeBooking);
    }
  }, [choiceLocation]);

  const convertTimestamp = (timestamp) => {
    const tempBookingMini = locations[0].cottage.period_minimum - 1;

    const periods = arePeriodConsecutiv(timestamp);

    periods.forEach((period) => {
      const periodStart = new Date(period.start.timestamp * 1000);
      const periodEnd = new Date(period.end.timestamp * 1000);

      const diffTime = Math.abs(periodEnd - periodStart);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > tempBookingMini) {
        /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
        // Retire des jours en rapport avec la durée minimum
        periodEnd.setHours(periodEnd.getHours() + 1);
        periodEnd.setDate(
          periodEnd.getDate() - locations[0].cottage.period_minimum
        );
        setPeriodsEndForArrivalDate((prevPeriodsEnd) => [
          ...prevPeriodsEnd,
          periodEnd,
        ]);
      } else if (diffDays === tempBookingMini) {
        periodEnd.setHours(periodEnd.getHours() + 1);
        periodEnd.setDate(periodEnd.getDate() - tempBookingMini);
        setPeriodsEndForArrivalDate((prevPeriodsEnd) => [
          ...prevPeriodsEnd,
          periodEnd,
        ]);
      } else {
        periodEnd.setHours(periodEnd.getHours() + 1);
      }

      setPeriodsEndForDepartureDate((prevPeriodsEnd) => [
        ...prevPeriodsEnd,
        periodEnd,
      ]);

      periodStart.setHours(periodStart.getHours() + 1);
      setPeriodsStart((prevPeriodsStart) => [...prevPeriodsStart, periodStart]);
    });
  };

  const buildSelectTraveller = () => {
    if (locations[0].cottage.period_minimum !== 0) {

      contentTraveller.current.innerHTML = '';

      const choiceQtyTraveller = (spanChoice) => {
        setQtyTraveller(Number(spanChoice.textContent));

        const prevChoice = Array.from(contentTraveller.current.childNodes).find(
          (x) => x.classList.contains(styles.choice)
        );
        prevChoice !== undefined
          ? prevChoice.classList.remove(styles.choice)
          : null;

          spanChoice.classList.add(styles.choice);

        if (document.getElementById('privacy').checked) { 
          btnPrivacy.current.onclick = function () {
            handleNavigateToSummary(Number(spanChoice.textContent));
          };
          btnPrivacy.current.disabled = false;
          setPrivacyChecked(true);
        }  
      };

      for (
        let index = 1;
        index < locations[0].cottage.period_minimum;
        index++
      ) {
        const option = creaDomElem("span", undefined, undefined, index);
        option.onclick = function (e) {
          choiceQtyTraveller(e.target);
        };
        contentTraveller.current.append(option);
      }
    }
  };

  const arePeriodConsecutiv = (periods) => {
    let results = [...periods];
    const periodsCheck = [];

    /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
    // Parcourir le tableau à partir du deuxième élément
    for (let i = 1; i < periods.length; i++) {
      /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
      // Extraire les périodes actuelle et précédente
      const prevPeriods = periods[i - 1];
      const currentPeriod = periods[i];

      /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
      // Convertir les timestamps Unix en objets Date
      const endPrevPeriod = new Date(prevPeriods.end.timestamp * 1000);
      const startPeriodCurrent = new Date(currentPeriod.start.timestamp * 1000);

      /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
      // Extraire les dates pour comparer uniquement le jour, le mois et l'année
      const endPeriodPrevDate = new Date(
        endPrevPeriod.getFullYear(),
        endPrevPeriod.getMonth(),
        endPrevPeriod.getDate()
      );
      const startPeriodCurrentDate = new Date(
        startPeriodCurrent.getFullYear(),
        startPeriodCurrent.getMonth(),
        startPeriodCurrent.getDate()
      );

      /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
      // Calculer la date qui suit la fin de la période précédente
      const tomorrowEndPeriodPrev = new Date(endPeriodPrevDate);
      tomorrowEndPeriodPrev.setDate(tomorrowEndPeriodPrev.getDate() + 1);

      /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
      // Vérifier si la date suivant la fin de la période précédente est égale à la date de début de la période actuelle
      const areConsecutiv =
        tomorrowEndPeriodPrev.getTime() === startPeriodCurrentDate.getTime();

      /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
      // Stocker la réponse dans le tableau de réponses
      periodsCheck.push({
        periodPrev: prevPeriods,
        periodCurrent: currentPeriod,
        areConsecutiv: areConsecutiv,
      });
    }

    periodsCheck.forEach((period) => {
      if (period.areConsecutiv) {
        const fusionPeriod = {
          end: period.periodCurrent.end,
          id: period.periodCurrent.id,
          start: period.periodPrev.start,
        };

        results = results.filter(
          (p) =>
            p.id !== period.periodCurrent.id && p.id !== period.periodPrev.id
        );

        results.push(fusionPeriod);
      }
    });

    return results;
  };

  const handleDateStartSelection = (date, position) => {
    /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
    // Enregistre la date de d'arrivée des clients
    const trueStartDate = new Date(date);
    setDateStartSelectionnee(trueStartDate);

    const tempBookingMini = locations[0].cottage.period_minimum;
    const trueEndDate = new Date(
      periodsEndForDepartureDate[position].getTime() +
      tempBookingMini * 24 * 60 * 60 * 1000
    );

    const diffTime = Math.abs(date - trueEndDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
    // Appliquer la periode minimum de résérvation
    date.setDate(date.getDate() + tempBookingMini);

    /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
    // Créer une nouvelle copie de periodsStart et met à jour la date sélectionnée
    const newPerdiodsStart = [...periodsStart];
    newPerdiodsStart[position] = date;

    if (diffDays === tempBookingMini + 1) {
      setPerdiodsStartUpdated(newPerdiodsStart[position]);
      setPerdiodsEndUpdated(newPerdiodsStart[position]);
    } else {
      setPerdiodsStartUpdated(newPerdiodsStart[position]);
      setPerdiodsEndUpdated(trueEndDate);
    }
  };

  const handleDateEndSelection = (date) => {
    setDateEndSelectionnee(date);
  };

  const handleDisplayPrivacy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setOnPrivacy(locations[0].cottage.privacy));
  };

  const handlePrivacyChecked = (e) => {
    e.stopPropagation();
    if (
      e.target.checked &&
      dateEndSelectionnee !== null &&
      dateStartSelectionnee !== null &&
      qtyTraveller !== 0
    ) {
      btnPrivacy.current.onclick = function () {
        handleNavigateToSummary();
      };
      btnPrivacy.current.disabled = false;
      setPrivacyChecked(true);
    } else {
      btnPrivacy.current.onclick = null;
      btnPrivacy.current.disabled = true;
      setPrivacyChecked(false);
    }
  };

  const handleNavigateToSummary = (qty) => {
    localStorage.setItem(
      "location",
      JSON.stringify([locations[0], { qtyTraveller: qtyTraveller === 0 ? qty : qtyTraveller }])
    );
    localStorage.setItem(
      "dates",
      JSON.stringify([dateStartSelectionnee, dateEndSelectionnee])
    );

    dispatch(
      setDatesLocation(
        JSON.stringify([dateStartSelectionnee, dateEndSelectionnee])
      )
    );
    return navigate("/summary");
  };

  return (
    <section ref={period} className={styles.periodsBooking}>
      <div>
        <aside className={styles.activeBtn}>
          <p>
            <Icon icon="entypo:users" style={{ color: "#333" }} />
            Capacité maximum : <b>{locations[0].capacity} personne(s)</b>
          </p>
          <p>
            <Icon icon="icomoon-free:calendar" style={{ color: "#333" }} />
            Période de réservation minimum :{" "}
            <b>{locations[0].cottage.period_minimum} jour(s)</b>
          </p>
        </aside>

        <Calendar
          dateDebut={periodsStart}
          dateFin={periodsEndForArrivalDate}
          onStartDateSelection={handleDateStartSelection}
          title={"Date d'arrivée"}
          container={"bookStart"}
        />

        {perdiodsStartUpdated ? (
          <Calendar
            dateDebut={[perdiodsStartUpdated]}
            dateFin={[perdiodsEndUpdated]}
            onEndDateSelection={handleDateEndSelection}
            title={"Date de départ"}
            container={"bookEnd"}
          />
        ) : (
          <></>
        )}

        <aside className={`${ready ? styles.activeBtn : ""}`}>
          <label htmlFor="qtyTraveller">
            Quel sera le nombre de personnes hébergées sur les lieux ?
            <div ref={contentTraveller}></div>
          </label>

          <label htmlFor="privacy" onClick={(e) => handleDisplayPrivacy(e)}>
            En cochant cette case, vous confirmez avoir pris connaissance et
            accepté les termes et conditions de ce règlement intérieur
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              onClick={(e) => handlePrivacyChecked(e)}
            />
          </label>
          <button disabled ref={btnPrivacy}>
            Récapitulatif de votre réservation
          </button>
        </aside>
      </div>
    </section>
  );
};

export default PeriodsBooking;
