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

  const resetChoiceDate = () => {
    const datesActive = document.querySelectorAll(
      `.${styles.available}.${styles.dateActive}`
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
                {Array.from({ length: 7 }, (_, i) => i).map((_, jourIndex) => (
                  <span key={jourIndex}>
                    {
                      ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][
                        jourIndex
                      ]
                    }
                  </span>
                ))}
              </div>
              {Array.from({ length: 6 }, (_, i) => i).map((_, semaineIndex) => (
                <div className={styles.dates} key={semaineIndex}>
                  {Array.from({ length: 7 }, (_, i) => i).map(
                    (_, jourIndex) => {
                      const jour = new Date(
                        mois.getFullYear(),
                        mois.getMonth(),
                        1 + jourIndex + semaineIndex * 7
                      );
                      return (
                        estDansLeMois(jour, mois) && (
                          <span
                            key={jourIndex}
                            className={`${
                              estDansLaPlage(jour) ? styles.available : ""
                            }`}
                            onClick={(e) =>
                              handleDateSelection(jour, e.currentTarget)
                            }
                          >
                            {estDansLaPlage(jour) ? (
                              <b>{jour.getDate()}</b>
                            ) : (
                              jour.getDate()
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
