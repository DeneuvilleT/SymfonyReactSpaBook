import React from "react";
import FormBook from "../../components/FormBook/FormBook";

import styles from "./home.styles.scss";

const Home = () => {
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
              value : false
            },
            hasPool: {
              label: "Piscine",
              name: "hasPool",
              type: "checkbox",
              value : false
            },
            animalAccepted: {
              label: "Animaux",
              name: "animalAccepted",
              type: "checkbox",
              value : false
            },
            hasGarden: {
              label: "Jardin",
              name: "hasGarden",
              type: "checkbox",
              value : false
            },
          }}
        />
      </section>

      <hr />
    </main>
  );
};

export default Home;
