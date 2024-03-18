import React from "react";
import Form from "../../components/Form/Form";

import styles from "./logup.styles.scss";

const Logup = () => {

  

  return (
    <>
      <div className={styles.formBoxContainer}>
        <h2>Vous ne disposez pas de compte ?</h2>
        <button className={styles.formSignUpBtn}>Inscription</button>
        <Form
          url={"/v1/register"}
          btnSubmit={"S'inscrire"}
          after={false}
          inputs={{
            firstname: {
              label: "Prénom",
              name: "firstname",
              type: "text",
            },
            lastname: {
              label: "Nom",
              name: "lastname",
              type: "text",
            },
            password: {
              label: "Mot de passe",
              name: "password",
              type: "password",
            },
            email: {
              label: "Email",
              name: "email",
              type: "email",
            },
          }}
        />
      </div>

      <div className={styles.formBoxContainer}>
        <h2>Vous ne disposez pas de compte ?</h2>
        <button className={styles.formSignInBtn}>Inscription</button>
      </div>

      <div className={styles.formBox}></div>
    </>
  );
};

export default Logup;
