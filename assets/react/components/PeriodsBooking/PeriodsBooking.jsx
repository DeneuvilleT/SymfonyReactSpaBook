import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./periodsBooking.styles.scss";
import Calendar from "../Calendar/Calendar";

const PeriodsBooking = () => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const period = useRef(null);
  const [ready, setReady] = useState(false);
  const [dateStartSelectionnee, setDateStartSelectionnee] = useState(null);
  const [dateEndSelectionnee, setDateEndSelectionnee] = useState(null);

  useEffect(() => {
    console.log(dateEndSelectionnee, dateStartSelectionnee);
    if (dateEndSelectionnee !== null && dateStartSelectionnee !== null) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [dateEndSelectionnee, dateStartSelectionnee]);

  const handleDateStartSelection = (date) => {
    setDateStartSelectionnee(date);
    setDateEndSelectionnee(null);
  };

  const handleDateEndSelection = (date) => {
    setDateEndSelectionnee(date);
  };

  const convertirTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    date.setHours(date.getHours() + 1);
    return date;
  };

  useEffect(() => {
    if (choiceLocation) {
      period.current.classList.add(styles.activeBooking);
    } else {
      period.current.classList.remove(styles.activeBooking);
    }
  }, [choiceLocation]);

  return (
    <section ref={period} className={styles.periodsBooking}>
      <div>
        <Calendar
          dateDebut={convertirTimestamp(
            locations[0].cottage.periods[0].start.timestamp
          )}
          dateFin={convertirTimestamp(
            locations[0].cottage.periods[0].end.timestamp
          )}
          onStartDateSelection={handleDateStartSelection}
          title={"Date d'arrivée"}
          container={"bookStart"}
        />

        {dateStartSelectionnee ? (
          <Calendar
            dateDebut={dateStartSelectionnee}
            dateFin={convertirTimestamp(
              locations[0].cottage.periods[0].end.timestamp
            )}
            onEndDateSelection={handleDateEndSelection}
            title={"Date de départ"}
            container={"bookEnd"}
          />
        ) : (
          <></>
        )}

        {ready ? <button>Suivant</button> : <></>}
      </div>
    </section>
  );
};

export default PeriodsBooking;
