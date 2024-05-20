import React, { useState } from "react";

import Datas from "./Datas/Datas";
import UpdateDatas from "./Datas/UpdateDatas/UpdateDatas";

import styles from "./userDatas.styles.scss";

const UserDatas = ({ infos }) => {
  const [modif, setModif] = useState(false);

  const handleChangeForm = () => {
    setModif(modif ? false : true);
  };

  return (
    <div className={styles.userDatas}>
      <section title="Modifier vos coordonnées">
        <div>
          <h3>Vos informations personnelles {infos.firstname}</h3>
          {!modif ? (
            <article className={styles.datas}>
              <Datas infos={infos} setModif={setModif} />

              <div>
                <button onClick={() => handleChangeForm()}>
                  Modifier mes informations
                </button>
              </div>
            </article>
          ) : (
            <article className={styles.datas}>
              <div>
                <button role="none" onClick={() => handleChangeForm()}>
                  Annuler les modifications
                </button>
              </div>

              <UpdateDatas infos={infos} />
            </article>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDatas;
