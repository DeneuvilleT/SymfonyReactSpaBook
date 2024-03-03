import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import styles from "./home.styles.scss";
import faces from "../../../../public/images/FACES/face.jpg";

const Home = () => {
  const { locations } = useSelector((state) => ({ ...state.location }));

  return (
    <main className={styles.home}>
      <h1>
        <Link to={"/"}>Cabane et gîte au naturel</Link>
      </h1>

      <section>
        {/* Afficher les locations */}
        {locations.length !== 0 ? (
          <ul className={styles.locations}>
            {locations.map((location) => (
              <li key={location.id}>
                <div className={styles.cardsLoc}>
                  <div
                    className={styles.imgBox}
                    style={{
                      backgroundImage: `url('${window.location.origin}/uploads/images/${
                        location.cottage.covers.find((x) => x.priority === 1)?.path || ""
                      }')`,
                    }}
                  ></div>

                  <div className={styles.content}>
                    <span>
                      <h3>{location.cottage.name}</h3>
                    </span>
                    <p dangerouslySetInnerHTML={{ __html: location.cottage.description }} />
                  </div>
                </div>

                {location.cottage.covers.length !== 0 ? (
                  <ul className={styles.thumbails}>
                    {location.cottage.covers.map((cover) => (
                      <li key={cover.id} style={{ backgroundImage: `url('${window.location.origin}/uploads/images/${cover.path}')` }}></li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <article className={styles.welcome}>
            <img src={faces} />
            <p>
              Bienvenue sur notre plateforme de location de gîtes et cabanes, où la nature est au cœur de votre séjour ! Plongez dans un monde où la
              tranquillité règne et où chaque souffle de vent vous transporte dans une aventure en harmonie avec la nature.
              <br />
              Notre site vous offre une sélection exclusive de gîtes et de cabanes nichés au cœur de paysages pittoresques, vous invitant à vous
              ressourcer loin de l'agitation urbaine.
              <br />
              Découvrez nos hébergements uniques, tous soigneusement sélectionnés pour vous offrir une expérience authentique et immersive. Que vous
              recherchiez une retraite romantique en amoureux, une escapade en famille ou une aventure entre amis, nous avons le lieu idéal pour
              répondre à vos besoins. <br />
              Chaque gîte et cabane est pensé pour vous offrir un confort optimal, sans compromis sur l'expérience en plein air. Des intérieurs
              chaleureux et accueillants aux terrasses offrant des vues imprenables, chaque détail a été soigneusement pensé pour créer un cadre idéal
              pour votre séjour. Explorez nos destinations variées, allant des forêts luxuriantes aux montagnes majestueuses, en passant par les rives
              paisibles des lacs et des rivières. Que vous soyez un amoureux de la randonnée, un passionné de photographie de nature ou simplement à
              la recherche d'un refuge tranquille, vous trouverez votre bonheur parmi notre sélection de destinations.
              <br />
              Réservez dès aujourd'hui et laissez-vous séduire par la magie de la nature dans l'un de nos gîtes ou cabanes. Laissez-nous vous aider à
              créer des souvenirs inoubliables dans des environnements naturels exceptionnels. Bienvenue dans votre havre de paix.
            </p>
          </article>
        )}
      </section>
    </main>
  );
};

export default Home;
