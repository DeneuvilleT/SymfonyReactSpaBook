import React from "react";
import Form from "../../../../../components/Form/Form";

const UpdateDatas = ({ infos }) => {
  return (
    <fieldset>
      <Form
        url={`/api/v1/customers/edit_customer/${infos.uid}`}
        btnSubmit={"Enregistrer"}
        after={true}
        hasLabel={false}
        inputs={{
          email: {
            label: "Email",
            name: "email",
            type: "email",
          },
          password: {
            label: "Mot de passe",
            name: "password",
            type: "password",
          },
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
          phone: {
            label: "Téléphone",
            name: "phone",
            type: "tel",
          },
        }}
      />
    </fieldset>
  );
};

export default UpdateDatas;
