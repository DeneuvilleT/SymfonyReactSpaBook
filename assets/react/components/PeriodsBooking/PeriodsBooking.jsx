import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Calendar from "../Calendar/Calendar";
import styles from "./periodsBooking.styles.scss";

const PeriodsBooking = () => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const period = useRef(null);
  const [ready, setReady] = useState(false);
  const [dateStartSelectionnee, setDateStartSelectionnee] = useState(null);
  const [dateEndSelectionnee, setDateEndSelectionnee] = useState(null);
  const [periodsStart, setPeriodsStart] = useState([]);
  const [periodsEnd, setPeriodsEnd] = useState([]);

  useEffect(() => {
    if (dateEndSelectionnee !== null && dateStartSelectionnee !== null) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [dateEndSelectionnee, dateStartSelectionnee]);

  useEffect(() => {
    if (choiceLocation) {
      period.current.classList.add(styles.activeBooking);
      convertirTimestamp(locations[0].cottage.periods);
    } else {
      period.current.classList.remove(styles.activeBooking);
    }
  }, [choiceLocation]);

  const handleDateStartSelection = (date) => {
    setDateStartSelectionnee(date);

    // Appliquer la periode minimum de résérvation
    date.setDate(date.getDate() + locations[0].cottage.period_minimum);
    setDateEndSelectionnee(null);
  };

  const handleDateEndSelection = (date) => {
    setDateEndSelectionnee(date);
  };

  const convertirTimestamp = (timestamp) => {
    timestamp.forEach((period) => {
      const periodStart = new Date(period.start.timestamp * 1000);
      const periodEnd = new Date(period.end.timestamp * 1000);

      periodStart.setHours(periodStart.getHours() + 1);
      periodEnd.setHours(periodEnd.getHours() + 1);

      setPeriodsStart((prevPeriodsStart) => [...prevPeriodsStart, periodStart]);
      setPeriodsEnd((prevPeriodsEnd) => [...prevPeriodsEnd, periodEnd]);
    });
  };

  return (
    <section ref={period} className={styles.periodsBooking}>
      <div>
        <Calendar
          dateDebut={periodsStart}
          dateFin={periodsEnd}
          onStartDateSelection={handleDateStartSelection}
          title={"Date d'arrivée"}
          container={"bookStart"}
        />

        {dateStartSelectionnee ? (
          <Calendar
            dateDebut={[dateStartSelectionnee]}
            dateFin={periodsEnd}
            onEndDateSelection={handleDateEndSelection}
            title={"Date de départ"}
            container={"bookEnd"}
          />
        ) : (
          <></>
        )}

        <aside className={`${ready ? styles.activeBtn : ""}`}>
          <button>Finaliser votre réservation</button>
        </aside>
      </div>
    </section>
  );
};

export default PeriodsBooking;
