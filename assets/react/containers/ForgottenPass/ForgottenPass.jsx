import React from "react";
import Form from "../../components/Form/Form";

const ForgottenPass = () => {
  return (
    <>
      <h3>Renseignez votre email</h3>
      <Form
        url={"/password/reset-request"}
        btnSubmit={"Envoyer"}
        after={false}
        inputs={{
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

export default ForgottenPass;
