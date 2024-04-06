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
  /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
  // Sélection des dates
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

  const handleDateSelection = (date, node, position) => {
    const selectedDate = new Date(date);

    if (onStartDateSelection && container !== "bookEnd") {
      resetChoiceDate();
      onStartDateSelection(selectedDate, position);
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

  const debuts = dateDebut.map((date) => {
    const debut = new Date(date);
    debut.setHours(0, 0, 0, 0);
    return debut;
  });

  const fins = dateFin.map((date) => {
    const fin = new Date(date);
    fin.setHours(0, 0, 0, 0);
    return fin;
  });

  /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
  // Fusionner les mois avec les mêmes dates
  let moisMap = new Map();

  const maxLen = Math.max(dateDebut.length, dateFin.length);

  for (let i = 0; i < maxLen; i++) {
    const debut = i < dateDebut.length ? debuts[i] : null;
    const fin = i < dateFin.length ? fins[i] : null;

    // Vérifiez si debut et fin sont null avant de continuer le traitement.
    if (debut === null || fin === null) {
      continue;
    }

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
          finPeriode: fin,
        });
      }
      moisActuel.setMonth(moisActuel.getMonth() + 1);
    }
  }

  /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
  // Convertir l'objet Map en tableau et le trier par ordre chronologique
  const moisEntreDates = Array.from(moisMap.values()).sort(
    (a, b) => a.debut - b.debut
  );

  /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
  // Vérification des dates
  const isInMonth = (date, mois) => {
    return (
      date.getMonth() === mois.debut.getMonth() &&
      date.getFullYear() === mois.debut.getFullYear()
    );
  };

  const isInPeriod = (date, debut, fin) => {
    return date >= debut && date <= fin;
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
                  {Array.from({ length: 7 }, (_, i) => i).map((_, dayIndex) => {
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

                    const currentDate = new Date(
                      month.debut.getFullYear(),
                      month.debut.getMonth(),
                      jour
                    );

                    return (
                      isInMonth(currentDate, month) && (
                        <span
                          key={dayIndex}
                          datatype={dayIndex}
                          className={`${
                            isInPeriod(
                              currentDate,
                              month.debutPeriode,
                              month.finPeriode
                            )
                              ? styles.available
                              : ""
                          }`}
                          onClick={(e) =>
                            isInPeriod(
                              currentDate,
                              month.debutPeriode,
                              month.finPeriode
                            )
                              ? handleDateSelection(
                                  currentDate,
                                  e.currentTarget, 
                                  debuts.indexOf(month.debutPeriode)
                                )
                              : null
                          }
                        >
                          {isInPeriod(
                            currentDate,
                            month.debutPeriode,
                            month.finPeriode
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
                  })}
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
