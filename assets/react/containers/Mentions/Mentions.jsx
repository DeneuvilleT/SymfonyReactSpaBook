import React from "react";

import styles from "../Home/home.styles.scss";

const Mentions = () => {
  return (
    <main className={`${styles.home} ${styles.other}`}>
      <div role="figure"></div>
      <article className={`${styles.welcome} ${styles.other}`}>
        <div className={styles.textBox}>
          <h2>Mentions légales</h2>
          <p>
            <span>
              Le présent site est la propriété de la société PAUSE ET NATURE,
              une entreprise de location de gîtes et cabanes.
            </span>
            <span>
              <b>Date de création de l'entreprise :</b> 12 juin 2023 <br />
              <b>Statuts constitutifs :</b> Société par actions simplifiée
              <br />
              <b>Forme juridique :</b> Société par actions simplifiée <br />
              <b>Numéro SIREN :</b> 953406360 <br />
              <b>Numéro SIRET (siège) :</b> 95340636000016 <br />
              <b>Numéro TVA Intracommunautaire :</b> FR74953406360 <br />
              <b>Numéro RCS :</b> Saintes B 953 406 360 <br />
              <b>Capital social :</b> 5 000,00 €
            </span>
            <span>
              <b>Siège social :</b> <br />
              2 RUE DE CHEZ CHABOT <br />
              17460 RIOUX
            </span>
            <span>
              <b>Hébergement :</b> <br />
              Le site est hébergé par GANDI, dont le siège social est situé à
              63-65 boulevard Masséna Paris (75013) FRANCE.
            </span>
            <span>
              <b>Responsabilité éditoriale : </b>
              <br />
              Le contenu du site a été élaboré avec le plus grand soin.
              Toutefois, PAUSE ET NATURE ne peut garantir l'exactitude,
              l'exhaustivité ou la pertinence des informations fournies. En
              conséquence, l'utilisateur reconnaît utiliser ces informations
              sous sa responsabilité exclusive.
            </span>
            <span>
              <b>Propriété intellectuelle :</b> <br />
              Le contenu du site, notamment les textes, images, logos, et
              éléments graphiques, est la propriété de PAUSE ET NATURE ou de ses
              partenaires et est protégé par les lois françaises et
              internationales relatives à la propriété intellectuelle. Toute
              reproduction, représentation, diffusion ou exploitation de tout ou
              partie du contenu, sans l'autorisation préalable et écrite de
              PAUSE ET NATURE, est strictement interdite et pourrait donner lieu
              à des poursuites judiciaires.
            </span>
            <span>
              <b>Liens hypertextes : </b>
              <br />
              Le site peut contenir des liens vers d'autres sites internet.
              PAUSE ET NATURE n'exerce aucun contrôle sur le contenu de ces
              sites et décline toute responsabilité quant à leur contenu ou à
              leur utilisation. L'inclusion de ces liens ne constitue en aucun
              cas une approbation ou une recommandation de leur part.
            </span>
          </p>
        </div>
      </article>
    </main>
  );
};

export default Mentions;
