import React from "react";
import { useSelector } from "react-redux";

import UserDatas from "./UserDatas/UserDatas";
import UserBookings from "./UserBookings/UserBookings";

import { Icon } from "@iconify/react";

import styles from "./profileBridge.styles.scss";

const ProfileBridge = () => {
  const { infos } = useSelector((state) => ({ ...state.auth }));

  return (
    <main className={styles.profilBridge}>
      <section>
        <h2>
          <Icon
            icon="line-md:cog-loop"
            style={{ color: "#017143" }}
            width="60"
            height="60"
          />
          <span>Paramétres du compte</span>
        </h2>

        <UserDatas infos={infos} />
      </section>
      <section>
        <h2>
          <Icon
            icon="line-md:sunny-outline-twotone-loop"
            style={{ color: " #ffc408" }}
            width="60"
            height="60"
          />
          <span>Mes réservations</span>
        </h2>

        <UserBookings infos={infos} />
      </section>
    </main>
  );
};

export default ProfileBridge;
