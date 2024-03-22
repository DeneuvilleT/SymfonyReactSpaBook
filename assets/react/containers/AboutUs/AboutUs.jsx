import React from "react";

import styles from "../Home/home.styles.scss";
import faces from "../../../../public/images/FACES/face_2.jpg";

const AboutUs = () => {
  return (
    <main className={styles.home}>
      <div role="figure"></div>
      <article className={styles.welcome}>
        <div className={styles.textBox}>
          <h2>
            Profitez de la <span>nature</span>
            <br />
            et détendez-vous
          </h2>
          <p>
            <span>
              Bienvenue sur notre plateforme de location de gîtes et cabanes, où
              la nature est au cœur de votre séjour ! Plongez dans un monde où
              la tranquillité règne et où chaque souffle de vent vous transporte
              dans une aventure en harmonie avec la nature.
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
              amoureux, une escapade en famille ou une aventure entre amis, nous
              avons le lieu idéal pour répondre à vos besoins. Chaque gîte et
              cabane est pensé pour vous offrir un confort optimal, sans
              compromis sur l'expérience en plein air.
            </span>
            <span>
              Des intérieurs chaleureux et accueillants aux terrasses offrant
              des vues imprenables, chaque détail a été soigneusement pensé pour
              créer un cadre idéal pour votre séjour. Explorez nos destinations
              variées, allant des forêts luxuriantes aux montagnes majestueuses,
              en passant par les rives paisibles des lacs et des rivières. Que
              vous soyez un amoureux de la randonnée, un passionné de
              photographie de nature ou simplement à la recherche d'un refuge
              tranquille, vous trouverez votre bonheur parmi notre sélection de
              destinations.
            </span>
            <span>
              Réservez dès aujourd'hui et laissez-vous séduire par la magie de
              la nature dans l'un de nos gîtes ou cabanes. Laissez-nous vous
              aider à créer des souvenirs inoubliables dans des environnements
              naturels exceptionnels. Bienvenue dans votre havre de paix.
            </span>
          </p>
        </div>
        <div className={styles.imageBox}>
          <img src={faces} title="Photo des propriétaires" />
        </div>
      </article>
    </main>
  );
};

export default AboutUs;