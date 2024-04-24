import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideHeader } from "../../utilities";

import FormBook from "../../components/FormBook/FormBook";

import { Icon } from "@iconify/react";

import styles from "./nav.styles.scss";
import axios from "axios";
import { logout } from "../../Store/slices/authSlices";

const Nav = () => {
  const { isLog, status } = useSelector((state) => ({ ...state.auth }));
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [icon, setIcon] = useState("quill:off");

  const handleAdmin = async () => {
    try {
      const response = await axios.get("/api/v1/access_admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        window.open(response.data.url, "_blank");
      }
    } catch (error) {
      return console.error(error);
    }
  };

  const handleLogout = async () => {
    setIcon("svg-spinners:90-ring");
    try {
      const submitLogout = await axios.get("/api/v1/logout");

      if (submitLogout.status === 200) {
        setTimeout(() => {
          dispatch(logout());
          setIcon("quill:off");
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      location.href = "/";
      return console.error(error);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {isLog ? <Link to={"/profile"}>Mon compte</Link> : <></>}

        <Link
          to={{ pathname: "/login", search: "?param=register" }}
          onClick={() => hideHeader()}
        >
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
          <Icon
            onClick={handleLogout}
            icon={icon}
            style={{ color: " #ffc408" }}
            width="50"
            height="40"
          />
        ) : (
          <Link to={"/login"} onClick={hideHeader}>
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
              option: [
                { value: "null", text: "Cabane et gite" },
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
