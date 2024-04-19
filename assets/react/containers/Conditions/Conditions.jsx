import React from "react";

import styles from "../Home/home.styles.scss";

const Conditions = () => {
  return (
    <main className={`${styles.home} ${styles.other}`}>
      <div role="figure"></div>
      <article className={`${styles.welcome} ${styles.other}`}>
        <div className={styles.textBox}>
          <h2>Conditions Générales de Vente</h2>
          <p>
            <span>
              <b>Champ d'application</b> <br />
              Les présentes conditions générales de vente s'appliquent à toutes
              les réservations effectuées auprès de PAUSE ET NATURE pour la
              location de gîtes et cabanes. Toute réservation implique
              l'acceptation sans réserve de ces conditions par le client.
            </span>
            <span>
              <b>Réservation</b> <br />
              Les réservations peuvent être effectuées en ligne via notre site
              web ou par téléphone. Elles sont considérées comme fermes et
              définitives après réception du paiement intégral du montant de la
              location.
            </span>
            <span>
              <b>Paiement</b> <br />
              Le paiement intégral de la location est exigé au moment de la
              réservation, sauf indication contraire spécifiée par PAUSE ET
              NATURE. Les paiements peuvent être effectués par carte bancaire ou
              virement bancaire.
            </span>
            <span>
              <b>Tarifs</b> <br />
              Les tarifs des locations sont indiqués en euros et incluent toutes
              les taxes applicables. Les frais supplémentaires éventuels, tels
              que les frais de ménage ou de dépôt de garantie, sont précisés
              lors de la réservation.
            </span>
            <span>
              <b>Modification et annulation</b> <br />
              Toute modification de réservation doit être demandée par écrit à
              PAUSE ET NATURE et est soumise à disponibilité. En cas
              d'annulation de la réservation, les frais d'annulation applicables
              sont précisés dans nos conditions d'annulation, disponibles sur
              demande.
            </span>
            <span>
              <b>Responsabilité</b> <br />
              PAUSE ET NATURE décline toute responsabilité en cas de vol, perte
              ou dommage des biens du client pendant la durée de la location. Le
              client est responsable de l'utilisation des installations mises à
              sa disposition et doit en assurer la conservation en bon état.
            </span>
            <span>
              <b>Litiges</b> <br />
              En cas de litige, une tentative de résolution à l'amiable sera
              recherchée. À défaut de résolution amiable, les litiges seront
              soumis aux tribunaux compétents conformément à la législation en
              vigueur.
            </span>
            <span>
              <b>Modification des conditions générales</b> <br />
              PAUSE ET NATURE se réserve le droit de modifier à tout moment les
              présentes conditions générales. Les nouvelles conditions générales
              seront applicables dès leur publication sur notre site web.
            </span>
          </p>
        </div>
      </article>
    </main>
  );
};

export default Conditions;
