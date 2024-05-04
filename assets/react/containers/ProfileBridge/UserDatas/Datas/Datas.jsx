import React from "react";
import { Icon } from "@iconify/react";

const Datas = ({ infos, setModif }) => {
  return (
    <fieldset onClick={() => setModif(true)}>
      <p>{infos.email}</p>
      <p>
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
        <Icon icon="tabler:point-filled" />
      </p>
      <p>{!infos.firstname ? "" : infos.firstname}</p>
      <p>{!infos.lastname ? "" : infos.lastname}</p>
      <p>{!infos.phone ? "" : infos.phone}</p>
    </fieldset>
  );
};

export default Datas;
