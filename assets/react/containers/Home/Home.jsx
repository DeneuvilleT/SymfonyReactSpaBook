import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./home.styles.scss";
import faces from "../../../../public/images/FACES/face_2.jpg";
import Locations from "../../components/Locations/Locations";

const Home = () => {
  const { locations } = useSelector((state) => ({ ...state.location }));

  const itemWelcomeOne = useRef(null);
  const itemWelcomeTwo = useRef(null);

  const locationHook = useLocation();

  useEffect(() => {
    /* ::::::::::::::::::::::::::::::::::::::::::::::::: */
    /* Réinitialisation des class */
    [itemWelcomeOne, itemWelcomeTwo].map((x) =>
      x.current.classList.remove(styles.hideModify)
    );

    if (locationHook.search === "?param=modify") {
      [itemWelcomeOne, itemWelcomeTwo].map((x) =>
        x.current.classList.add(styles.hideModify)
      );
    }

    if (locations.length !== 0) {
      [itemWelcomeOne, itemWelcomeTwo].map((x) =>
        x.current.classList.add(styles.hide)
      );
    } else {
      [itemWelcomeOne, itemWelcomeTwo].map((x) =>
        x.current.classList.remove(styles.hide)
      );
    }
  }, [locations, locationHook]);

  return (
    <main className={styles.home}>
      <div role="switch"></div>

      <section>
        <div ref={itemWelcomeOne} role="figure"></div>

        <article ref={itemWelcomeTwo} className={styles.welcome}>
          <div className={styles.textBox}>
            <h2>
              Profitez de la <span>nature</span>
              <br />
              et détendez-vous
            </h2>
            <p>
              <span>
                Bienvenue sur notre plateforme de location de gîtes et cabanes,
                où la nature est au cœur de votre séjour ! Plongez dans un monde
                où la tranquillité règne et où chaque souffle de vent vous
                transporte dans une aventure en harmonie avec la nature.
              </span>
              <span>
                Notre site vous offre une sélection exclusive de gîtes et de
                cabanes nichés au cœur de paysages pittoresques, vous invitant à
                vous ressourcer loin de l'agitation urbaine.
              </span>
              <span>
                Découvrez nos hébergements uniques, tous soigneusement
                sélectionnés pour vous offrir une expérience authentique et
                immersive. Que vous recherchiez une retraite romantique en
                amoureux, une escapade en famille ou une aventure entre amis,
                nous avons le lieu idéal pour répondre à vos besoins.
              </span>
              <Link to={"/qui-sommes-nous"}><span>En apprendre plus</span></Link>
            </p>
          </div>
          <div className={styles.imageBox}>
            <img src={faces} title="Photo des propriétaires" />
          </div>
        </article>

        {locations.length !== 0 ? (
          <Locations locationsDatas={locations} />
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Home;
