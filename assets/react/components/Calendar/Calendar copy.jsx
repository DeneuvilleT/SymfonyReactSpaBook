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
  // Convertir les dates en objets Date
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);

  // Tableau pour stocker les mois entre les deux dates
  let moisEntreDates = [];

  // Fonction pour obtenir les mois entre deux dates
  const obtenirMoisEntreDates = (dateDebut, dateFin) => {
    let mois = [];
    let moisActuel = new Date(dateDebut.getFullYear(), dateDebut.getMonth(), 1);

    while (moisActuel < dateFin) {
      mois.push(new Date(moisActuel));
      moisActuel.setMonth(moisActuel.getMonth() + 1);
    }

    return mois;
  };

  // Obtenir les mois entre les deux dates
  moisEntreDates = obtenirMoisEntreDates(debut, fin);

  // Fonction pour vérifier si une date est dans le mois en cours
  const estDansLeMois = (date, mois) => {
    return date.getMonth() === mois.getMonth();
  };

  // Fonction pour vérifier si une date est entre les deux dates spécifiées
  const estDansLaPlage = (date) => {
    return date >= debut && date <= fin;
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

  // Fonction pour gérer la sélection de la date
  const handleDateSelection = (date, node) => {
    if (onStartDateSelection) {
      resetChoiceDate();
      onStartDateSelection(date);
    }

    if (onEndDateSelection) {
      resetChoiceDate(true);
      onEndDateSelection(date);
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
        {moisEntreDates.map((mois, index) => (
          <article key={index}>
            <h5>
              {mois.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h5>

            <div className={styles.rowCalendar}>
              <div className={styles.days}>
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(
                  (jour, jourIndex) => (
                    <span key={jourIndex}>{jour}</span>
                  )
                )}
              </div>
              {Array.from({ length: 6 }, (_, i) => i).map((_, semaineIndex) => (
                <div className={styles.dates} key={semaineIndex}>
                  {Array.from({ length: 7 }, (_, i) => i).map(
                    (_, jourIndex) => {
                      const premierJourDuMois = new Date(
                        mois.getFullYear(),
                        mois.getMonth(),
                        1
                      );
                      const premierJourSemaine = premierJourDuMois.getDay();
                      const joursDansLeMois =
                        new Date(
                          mois.getFullYear(),
                          mois.getMonth() + 1,
                          0
                        ).getDate();

                      const jour =
                        jourIndex - premierJourSemaine + 1 + semaineIndex * 7;

                      return (
                        estDansLeMois(
                          new Date(mois.getFullYear(), mois.getMonth(), jour),
                          mois
                        ) && (
                          <span
                            key={jourIndex}
                            className={`${
                              estDansLaPlage(new Date(mois.getFullYear(), mois.getMonth(), jour))
                                ? styles.available
                                : ""
                            }`}
                            onClick={(e) =>
                              estDansLaPlage(new Date(mois.getFullYear(), mois.getMonth(), jour))
                                ? handleDateSelection(
                                    new Date(
                                      mois.getFullYear(),
                                      mois.getMonth(),
                                      jour
                                    ),
                                    e.currentTarget
                                  )
                                : null
                            }
                          >
                            {estDansLaPlage(new Date(mois.getFullYear(), mois.getMonth(), jour))
                              ? <b>{jour}</b>
                              :  jour > 0 && jour <= joursDansLeMois
                              ? jour
                              : ""}
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
