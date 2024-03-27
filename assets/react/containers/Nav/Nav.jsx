import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { hideHeader } from "../../utilities";

import FormBook from "../../components/FormBook/FormBook";

import styles from "./nav.styles.scss";
import axios from "axios";

const Nav = () => {
  const { isLog, status } = useSelector((state) => ({ ...state.auth }));
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const handleAdmin = async () => {
    try {
      const response = await axios.get("/api/v1/access_admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return (location.href = response.data.url);
      }
    } catch (error) {
      return console.error(error);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {isLog ? <Link to={"/profile"}>Profil</Link> : <></>}

        <Link to={"/login#register"} onClick={() => hideHeader()}>
          Inscription
        </Link>

        {status === "ROLE_SUPER_ADMIN" ? (
          <a
            target="_blank"
            style={{ cursor: "pointer" }}
            onClick={handleAdmin}
          >
            Administration
          </a>
        ) : (
          <></>
        )}

        {isLog ? (
          <Link to={"/logout"}>Déconnexion</Link>
        ) : (
          <Link to={"/login"} onClick={() => hideHeader()}>
            Connexion
          </Link>
        )}
      </ul>

      <aside className={styles.locations}>
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
              value: false,
            },
            hasPool: {
              label: "Piscine",
              name: "hasPool",
              type: "checkbox",
              value: false,
            },
            animalAccepted: {
              label: "Animaux",
              name: "animalAccepted",
              type: "checkbox",
              value: false,
            },
            hasGarden: {
              label: "Jardin",
              name: "hasGarden",
              type: "checkbox",
              value: false,
            },
          }}
        />
      </aside>
    </nav>
  );
};

export default Nav;
