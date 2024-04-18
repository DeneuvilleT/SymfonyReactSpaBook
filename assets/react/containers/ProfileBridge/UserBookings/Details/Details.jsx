import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";

import styles from "../../UserBookings/userBookings.styles.scss";

const Details = ({ cottage, display }) => {

  const [heightLine, setHeightLine] = useState(60);

  useEffect(() => {
    setHeightLine(heightLine * 4);
  }, []);

  return (
    <aside
      className={styles.containerBooking}
      style={{
        height: display ? `${heightLine}px` : "0",
      }}
    >
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html:
              cottage.description.length > 200
                ? `${cottage.description.substr(0, 200)} ...`
                : cottage.description.substr(0, 200),
          }}
        />

        <p>
          <span>
            <Icon
              icon="iwwa:file-pdf"
              width="3em"
              height="3em"
              style={{ color: "#444" }}
            />
            <b>Télécharger la facture</b>
          </span>

          <span>
            <Icon
              icon="iconoir:privacy-policy"
              width="2em"
              height="3em"
              style={{ color: "#444" }}
            />
            <b>Régles de l'hébergement</b>
          </span>

          <span>
            <Icon
              icon="material-symbols:euro"
              width="2.25em"
              height="3em"
              style={{ color: "#444" }}
            />
            <b>
              {(Number(cottage.price) / 100).toString().replace(".", ",")}
              &nbsp;€ la nuit
            </b>
          </span>
        </p>
      </div>
    </aside>
  );
};

export default Details;
