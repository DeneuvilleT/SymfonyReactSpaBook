import React from "react";
import FormBook from "../../components/FormBook/FormBook";

import styles from "./home.styles.scss";

const Home = () => {
  return (
    <main className={styles.home}>
      <h3>Bienvenue sur les logis de Pause & Nature</h3>

      <section>
        <FormBook
          url={"/location/search"}
          btnSubmit={"Trouver"}
          hasLabel={true}
          after={false}
          inputs={{
            accommodation: {
              label: "Type d'hébergement :",
              name: "accommodation",
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
              value : "false"
            },
            hasPool: {
              label: "Piscine",
              name: "hasPool",
              type: "checkbox",
              value : "false"
            },
            isAnimals: {
              label: "Animaux",
              name: "isAnimals",
              type: "checkbox",
              value : "false"
            },
          }}
        />
      </section>

      <hr />
    </main>
  );
};

export default Home;
