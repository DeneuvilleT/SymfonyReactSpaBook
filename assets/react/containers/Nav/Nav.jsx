import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductsStatus, fetchProducts } from "../../Store/slices/productsSlices";

import FormBook from "../../components/FormBook/FormBook";

import styles from "./nav.styles.scss";

const Nav = () => {
  const { isLog, status } = useSelector((state) => ({ ...state.auth }));
  const token = localStorage.getItem(`${location.origin}_bear_token`);

  // const dispatch = useDispatch();

  // const productsStatus = useSelector(getProductsStatus);

  // useEffect(() => {
  //   if (productsStatus === "idle") {
  //     dispatch(fetchProducts());
  //   }
  // }, [productsStatus, dispatch]);

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
        <h1>{/* <Link to={"/"}>Cabane et gîte au naturel</Link> */}</h1>
        {/* <Link to={"/"}>Produits</Link>
        <Link to={"/cart"}>Panier</Link> */}

        {isLog ? <Link to={"/profile"}>Profil</Link> : <></>}
        <Link to={"/register"}>Inscription</Link>

        {status === "ROLE_SUPER_ADMIN" ? (
          <a target="_blank" style={{ cursor: "pointer" }} onClick={handleAdmin}>
            Administration
          </a>
        ) : (
          <></>
        )}

        {isLog ? <Link to={"/logout"}>Déconnexion</Link> : <Link to={"/login"}>Connexion</Link>}
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
