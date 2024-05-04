import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { PDFDownloadLink } from "@react-pdf/renderer";

import { Icon } from "@iconify/react";

import styles from "../../UserBookings/userBookings.styles.scss";
import Invoice from "../../../../components/Invoice/Invoice";
import { setOnPrivacy } from "../../../../Store/slices/locationsSlices";

const Details = ({ booking, cottage, display }) => {
  const { infos } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();

  const [heightLine, setHeightLine] = useState(60);

  useEffect(() => {
    setHeightLine(innerWidth > 515 ? heightLine * 1.4 : 235);
  }, []);

  const handleDisplayPrivacy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setOnPrivacy(cottage.privacy));
  };

  return (
    <aside
      className={styles.containerBooking}
      style={{
        height: display ? `${heightLine}px` : "0",
      }}
    >
      <div>
        <p>
          <span>
            <Icon
              icon="iwwa:file-pdf"
              width="3em"
              height="3em"
              style={{ color: "#fff" }}
            />

            <PDFDownloadLink
              document={<Invoice booking={booking} infos={infos} />}
              fileName={`Réservation_${booking.id}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading
                  ? "Chargement de la facture ..."
                  : "Télécharger la facture"
              }
            </PDFDownloadLink>
          </span>

          <span>
            <Icon
              icon="material-symbols:euro"
              width="2.25em"
              height="3em"
              style={{ color: "#fff" }}
            />
            <b>
              {(Number(cottage.price) / 100).toString().replace(".", ",")}
              &nbsp;€ la nuit
            </b>
          </span>

          <span onClick={(e) => handleDisplayPrivacy(e)}>
            <Icon
              icon="iconoir:privacy-policy"
              width="2em"
              height="3em"
              style={{ color: "#fff" }}
            />
            <b>Régles de l'hébergement</b>
          </span>
        </p>
      </div>
    </aside>
  );
};

export default Details;
