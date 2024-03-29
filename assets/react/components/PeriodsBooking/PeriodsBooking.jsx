import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./periodsBooking.styles.scss";
import Calendar from "../Calendar/Calendar";;

const PeriodsBooking = () => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const period = useRef(null);

  const convertirTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    date.setHours(date.getHours() + 1);
    return date;
  };

  useEffect(() => {
    if (choiceLocation) {
      period.current.classList.add(styles.activeBooking);
      console.log(
        convertirTimestamp(locations[0].cottage.periods[0].start.timestamp),
        convertirTimestamp(locations[0].cottage.periods[0].end.timestamp)
      );
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
        />
      </div>
    </section>
  );
};

export default PeriodsBooking;
