import React from "react";
import FormBook from "../../components/FormBook/FormBook";

import { useSelector } from "react-redux";

import styles from "./home.styles.scss";

const Home = () => {
  const { locations } = useSelector((state) => ({ ...state.location }));

  return (
    <main className={styles.home}>
      <section>
        <FormBook
          url={"/location/search"}
          btnSubmit={"Trouver"}
          hasLabel={true}
          after={false}
          inputs={{
            cottage: {
              label: "Type d'hébergement :",
              name: "cottage",
              type: "select",
              value: "0",
              option: [
                { value: "0", text: "Cabane" },
                { value: "1", text: "Gite" },
              ],
            },
            begin: {
              label: "A partir de :",
              name: "begin",
              type: "date",
            },
            end: {
              label: "Jusqu'au :",
              name: "end",
              type: "date",
            },
            capacity: {
              label: "Nombre de personnes :",
              name: "capacity",
              type: "number",
            },
            hasSanitary: {
              label: "Sanitaire personnel",
              name: "hasSanitary",
              type: "checkbox",
              value: false,
            },
            hasPool: {
              label: "Piscine",
              name: "hasPool",
              type: "checkbox",
              value: false,
            },
            animalAccepted: {
              label: "Animaux",
              name: "animalAccepted",
              type: "checkbox",
              value: false,
            },
            hasGarden: {
              label: "Jardin",
              name: "hasGarden",
              type: "checkbox",
              value: false,
            },
          }}
        />

        <hr />

        {/* Afficher les locations */}
        {locations.length !== 0 ? (
          <aside className={styles.locations}>
            <h2>Locations trouvées :</h2>
            <ul>
              {locations.map((location) => (
                <>
                  <li
                    key={location.id}
                    style={{ backgroundImage: `url('${window.location.origin}/uploads/images/${location.cottage.covers[0].path}')` }}
                  >
                    <h3>{location.cottage.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: location.cottage.description }} />
                  </li>

                  {location.cottage.covers.length !== 0 ? (
                    <ul>
                      {location.cottage.covers.map((cover) => (
                        <li>
                          <img src={`${window.location.origin}/uploads/images/${cover.path}`} alt={`Photo ${location.cottage.name}`} />{" "}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </ul>
          </aside>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Home;
