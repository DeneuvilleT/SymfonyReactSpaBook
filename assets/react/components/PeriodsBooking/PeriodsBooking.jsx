import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

import Calendar from "../Calendar/Calendar";
import styles from "./periodsBooking.styles.scss";
import { setOnPrivacy } from "../../Store/slices/locationsSlices";

const PeriodsBooking = () => {
  const { choiceLocation, locations } = useSelector((state) => ({
    ...state.location,
  }));

  const dispatch = useDispatch();

  const period = useRef(null);
  const btnPrivacy = useRef(null);

  const [ready, setReady] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

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

  const handlePrivacyChecked = (e) => {
    e.stopPropagation();

    if (e.currentTarget.checked) {
      btnPrivacy.current.disabled = false;
      setPrivacyChecked(true);
    } else {
      btnPrivacy.current.disabled = true;
      setPrivacyChecked(false);
    }
  };

  const handleDisplayPrivacy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setOnPrivacy(locations[0].cottage.privacy));
  };

  return (
    <section ref={period} className={styles.periodsBooking}>
      <div>
        <aside className={styles.activeBtn}>
          <p>
            <Icon icon="icomoon-free:calendar" style={{ color: "#333" }} />
            Période de réservation minimum :{" "}
            <b>{locations[0].cottage.period_minimum} jours</b>
          </p>
        </aside>
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
            Finaliser votre réservation
          </button>
        </aside>
      </div>
    </section>
  );
};

export default PeriodsBooking;
