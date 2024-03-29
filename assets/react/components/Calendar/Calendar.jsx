import React from "react";

const Calendar = ({ dateDebut, dateFin }) => {
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

  // Fonction pour vérifier si une date est entre les deux dates spécifiées
  const estDansLaPlage = (date) => {
    return date >= debut && date <= fin;
  };

  return (
    <div>
      {moisEntreDates.map((mois, index) => (
        <div key={index}>
          <h3>
            {mois.toLocaleString("default", { month: "long", year: "numeric" })}
          </h3>
          <table>
            <tbody>
              <tr>
                {Array.from({ length: 7 }, (_, i) => i).map((_, jourIndex) => (
                  <th key={jourIndex}>
                    {
                      ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][
                        jourIndex
                      ]
                    }
                  </th>
                ))}
              </tr>
              {Array.from({ length: 6 }, (_, i) => i).map((_, semaineIndex) => (
                <tr key={semaineIndex}>
                  {Array.from({ length: 7 }, (_, i) => i).map(
                    (_, jourIndex) => {
                      const jour = new Date(
                        mois.getFullYear(),
                        mois.getMonth(),
                        1 + jourIndex + semaineIndex * 7
                      );
                      return (
                        <td
                          key={jourIndex}
                          style={{
                            color: estDansLaPlage(jour) ? "red" : "inherit",
                          }}
                        >
                          {estDansLaPlage(jour) ? (
                            <strong>{jour.getDate()}</strong>
                          ) : (
                            jour.getDate()
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
