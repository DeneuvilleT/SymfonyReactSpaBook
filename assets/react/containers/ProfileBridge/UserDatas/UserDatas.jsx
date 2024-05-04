import React, { useState } from "react";

import Datas from "./Datas/Datas";
import UpdateDatas from "./Datas/UpdateDatas/UpdateDatas";

import styles from "./userDatas.styles.scss";

const UserDatas = ({ infos }) => {
  const [modif, setModif] = useState(false);

  return (
    <div className={styles.userDatas}>
      <section title="Modifier vos coordonnées">
        <div>
          <h3>Bienvenue {infos.firstname}</h3>
          {!modif ? (
            <Datas infos={infos} setModif={setModif} />
          ) : (
            <UpdateDatas infos={infos} />
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDatas;
