import React from "react";
import Form from "../../components/Form/Form";

const Logup = () => {

  return (
    <>
      <h3>Inscrivez-vous</h3>
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
    </>
  );
};

export default Logup;
