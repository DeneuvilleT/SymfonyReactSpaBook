import React from "react";
import styles from "./calendar.styles.scss";

const Calendar = ({
  dateDebut,
  dateFin,
  onStartDateSelection,
  onEndDateSelection,
  title,
  container,
}) => {

  const debuts = dateDebut.map((date) => {
    const debut = new Date(date);
    debut.setHours(0, 0, 0, 0);
    return debut;
  });

  const fins = dateFin.map((date) => {
    const fin = new Date(date);
    return fin;
  });


  // Fusionner les mois avec les mêmes dates
  let moisMap = new Map();

  for (let i = 0; i < debuts.length; i++) {
    const debut = debuts[i];
    const fin = fins[i];

    let moisActuel = new Date(debut.getFullYear(), debut.getMonth(), 1);

    while (moisActuel < fin) {
      const key = moisActuel.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!moisMap.has(key)) {
        moisMap.set(key, {
          debut: new Date(moisActuel),
          fin: new Date(moisActuel.getFullYear(), moisActuel.getMonth() + 1, 0),
          debutPeriode: debut,
        });
      }

      moisActuel.setMonth(moisActuel.getMonth() + 1);
    }
  }

  // Convertir l'objet Map en tableau et le trier par ordre chronologique
  const moisEntreDates = Array.from(moisMap.values()).sort(
    (a, b) => a.debut - b.debut
  );


  const isInMonth = (date, mois) => {
    return (
      date.getMonth() === mois.debut.getMonth() &&
      date.getFullYear() === mois.debut.getFullYear()
    );
  };



  const isInPeriod = (date, debut) => {
    return date >= debut;
  };

  const resetChoiceDate = (endDate = false) => {
    const datesActive = document.querySelectorAll(
      endDate
        ? `#bookEnd .${styles.available}.${styles.dateActive}`
        : `.${styles.available}.${styles.dateActive}`
    );

    datesActive.length !== 0
      ? datesActive.forEach((x) => x.classList.remove(styles.dateActive))
      : null;
  };


  const handleDateSelection = (date, node) => {
    const selectedDate = new Date(date);

    if (onStartDateSelection && container !== "bookEnd") {
      resetChoiceDate();
      onStartDateSelection(selectedDate);
    }

    if (onEndDateSelection && container === "bookEnd") {
      resetChoiceDate(true);
      onEndDateSelection(selectedDate);
    }

    node.classList.add(styles.dateActive);
    document.getElementById(container).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <>
      <h4>{title}</h4>
      
      <div id={container} className={styles.calendar}>

        {moisEntreDates.map((month, indexMonth) => (
          <article key={indexMonth}>
            <h5>
              {month.debut.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h5>


            <div className={styles.rowCalendar}>

              <div className={styles.days}>
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(
                  (jour, dayIndex) => (
                    <span key={dayIndex}>{jour}</span>
                  )
                )}
              </div>


              {Array.from({ length: 6 }, (_, i) => i).map((_, weekIndex) => (

                <div className={styles.dates} key={weekIndex}>

                  {Array.from({ length: 7 }, (_, i) => i).map(
                    (_, dayIndex) => {

                      const firstDayMonth = new Date(
                        month.debut.getFullYear(),
                        month.debut.getMonth(),
                        1
                      );

                      const firstDaysWeek = firstDayMonth.getDay();
                      const dayInTheMonth = new Date(
                        month.debut.getFullYear(),
                        month.debut.getMonth() + 1,
                        0
                      ).getDate();

                      const jour = dayIndex - firstDaysWeek + 1 + weekIndex * 7;

                      return (
                        isInMonth(
                          new Date(
                            month.debut.getFullYear(),
                            month.debut.getMonth(),
                            jour
                          ),
                          month
                        ) && (
                          <span
                            key={dayIndex}
                            datatype={dayIndex}
                            className={`${
                              isInPeriod(
                                new Date(
                                  month.debut.getFullYear(),
                                  month.debut.getMonth(),
                                  jour
                                ),
                                month.debutPeriode
                              )
                                ? styles.available
                                : ""
                            }`}
                            onClick={(e) =>
                              isInPeriod(
                                new Date(
                                  month.debut.getFullYear(),
                                  month.debut.getMonth(),
                                  jour
                                ),
                                month.debutPeriode
                              )
                                ? handleDateSelection(
                                    new Date(
                                      month.debut.getFullYear(),
                                      month.debut.getMonth(),
                                      jour
                                    ),
                                    e.currentTarget
                                  )
                                : null
                            }
                          >
                            {isInPeriod(
                              new Date(
                                month.debut.getFullYear(),
                                month.debut.getMonth(),
                                jour
                              ),
                              month.debutPeriode
                            ) ? (
                              <b>{jour}</b>
                            ) : jour > 0 && jour <= dayInTheMonth ? (
                              jour
                            ) : (
                              ""
                            )}
                          </span>
                        )
                      );
                    }
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Calendar;
