import React from "react";

import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import styles from "./profileBridge.styles.scss";

const ProfileBridge = () => {
  const navigate = useNavigate();

  const handleUserData = () => navigate("/user/datas");
  const handleUserOrder = () => navigate("/user/orders");
  const handleUserCommennt = () => navigate("/user/comments");

  return (
    <main className={styles.profilBridge}>
      <div onClick={handleUserData}>
        <Icon
          icon="line-md:cog-loop"
          style={{ color: "#017143" }}
          width="80"
          height="80"
        />
        <p>Paramétres du compte</p>
      </div>
      <div onClick={handleUserOrder}>
        <Icon
          icon="line-md:sunny-outline-twotone-loop"
          style={{ color: " #ffc408" }}
          width="80"
          height="80"
        />
        <p>Mes réservations</p>
      </div>
      <div onClick={handleUserCommennt}>
        <Icon
          icon="line-md:coffee-half-empty-twotone-loop"
          style={{ color: "#69340e" }}
          width="80"
          height="80"
        />
        <p>Mes commentaires</p>
      </div>
    </main>
  );
};

export default ProfileBridge;
