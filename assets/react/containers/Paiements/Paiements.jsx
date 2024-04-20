import React from "react";

import styles from "../Home/home.styles.scss";

const Paiements = () => {
  return (
    <main className={`${styles.home} ${styles.other}`}>
      <div role="figure"></div>
      <article className={`${styles.welcome} ${styles.other}`}>
        <div className={styles.textBox}>
          <h2>Moyens de Paiement Acceptés</h2>
          <p>
            <span>
              PAUSE ET NATURE propose les moyens de paiement suivants pour
              régler vos réservations de gîtes et cabanes :
            </span>
            <span>
              <b>Stripe : </b> <br />
              Nous acceptons les paiements par carte bancaire via la plateforme
              sécurisée Stripe. Avec Stripe, vous pouvez utiliser les
              principales cartes de crédit telles que Visa, Mastercard, American
              Express, ainsi que d'autres méthodes de paiement locales.
            </span>
            <span>
              <b>PayPal :</b> <br />
              Nous acceptons également les paiements via PayPal, une solution de
              paiement en ligne sécurisée et largement utilisée dans le monde
              entier. Avec PayPal, vous pouvez effectuer des paiements en
              utilisant votre solde PayPal, votre carte de crédit ou votre
              compte bancaire lié.
            </span>
          </p>
        </div>
      </article>
    </main>
  );
};

export default Paiements;
