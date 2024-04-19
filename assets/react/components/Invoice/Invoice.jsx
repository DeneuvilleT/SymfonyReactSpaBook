import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../../../public/images/INVOICE/logo.jpg";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  subTitleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bolder",
    marginBottom: 30,
    textAlign: "left",
  },
  logoImg: {
    width: 125,
    height: 120,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 800,
    marginTop: 20,
    marginBottom: 5,
    color: "#fff",
    padding: "7.5px 12.5px",
    backgroundColor: "green",
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCol: {
    fontSize: 14,
    width: "50%",
    textAlign: "left",
  },
  tableColRight: {
    fontWeight: 400,
    fontSize: 14,
    color: "#333",
    width: "50%",
    textAlign: "right",
  },
  tableColRightTitle: {
    fontSize: 14,
    width: "50%",
    textAlign: "right",
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
    marginTop: 2.5,
    marginBottom: 2.5,
    lineHeight: 1.5,
    textAlign: "start",
  },
  textTop: {
    fontSize: 12,
    color: "#222",
    textAlign: "start",
  },
  bottomPage: {
    flexDirection : "column",
    alignItems : "center",
  },
  textBottomUp: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
    marginBottom : 10,
  },
  textBottom: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
});

const Invoice = ({ booking, infos }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <View style={styles.subTitleContainer}>
            <Text style={styles.title}>Facture de Réservation</Text>
            <Text style={styles.text}>
              {infos.lastname} {infos.firstname}
            </Text>
            <Text style={styles.textTop}>{infos.email}</Text>
          </View>
          <Image style={styles.logoImg} src={logo} />
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol}>Catégories</Text>
            <Text style={styles.tableColRightTitle}>Détails</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Réservation :</Text>
            <Text
              style={styles.tableColRight}
            >{`facture__00${booking.id}`}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Créé le :</Text>
            <Text style={styles.tableColRight}>
              {format(new Date(booking.createdAt), "dd MMMM yyyy", {
                locale: fr,
              })}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Hébergement :</Text>
            <Text style={styles.tableColRight}>{booking.cottage.name}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Date d'arrivée :</Text>
            <Text style={styles.tableColRight}>
              {format(new Date(booking.start), "dd MMMM yyyy", {
                locale: fr,
              })}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Date de départ :</Text>
            <Text style={styles.tableColRight}>
              {format(new Date(booking.end), "dd MMMM yyyy", {
                locale: fr,
              })}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Prix unitaire nuit :</Text>
            <Text style={styles.tableColRight}>
              {" "}
              {(Number(booking.cottage.price) / 100)
                .toString()
                .replace(".", ",")}{" "}
              €
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Nombre de nuits :</Text>
            <Text style={styles.tableColRight}>
              {Math.floor(
                (new Date(booking.end) - new Date(booking.start)) /
                  (1000 * 60 * 60 * 24)
              )}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Nombre de personnes :</Text>
            <Text style={styles.tableColRight}>{booking.traveller}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Prix total :</Text>
            <Text style={styles.tableColRight}>
              {(Number(booking.price) / 100).toString().replace(".", ",")} €
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Détails de la facture :</Text>
          <View style={styles.section}>
            <Text style={styles.text}>
              Cette facture a été réglée le
              {format(new Date(booking.createdAt), "dd MMMM yyyy", {
                locale: fr,
              })}{" "}
              sur la plateforme de paiement en ligne Stripe.
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Nous contacter :</Text>
          <View style={styles.section}>
            <Text style={styles.text}>Par téléphone au : 03.23.56.51.50</Text>
            <Text style={styles.text}>
              Par courriel : contact@cabaneetgiteaunaturel.com
            </Text>
          </View>
        </View>

        <View style={styles.bottomPage}>
          <Text style={styles.textBottomUp}>
            SIRET : 95340636000016 &nbsp;|&nbsp; TVA : FR74953406360 &nbsp;|&nbsp; Adresse : 2 RUE DE CHEZ CHABOT 17460 RIOUX
          </Text>
          <Text style={styles.textBottom}>
            Copyright | 2024 Pause et nature | Tous droits réservés
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Invoice;
