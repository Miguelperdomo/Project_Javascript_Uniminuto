"use client";
import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  table: {
    display: "table" as any,
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: "1%",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,

    backgroundColor: "#075695",
    color: "white",
  },
  tableCol2: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    padding: "3%",
  },
});

const data = [
  // {
  //   porcent: "De 300 puntos posibles, su puntaje es:",
  // },
  {
    mod: "COMUNICACIÓN ESCRITA",
    porcent: "CE",
  },
  {
    mod: "RAZONAMIENTO CUANTITATIVO",
    porcent: "RC",
  },
  {
    mod: "LECTURA CRÍTICA",
    porcent: "LC",
  },
  {
    mod: "COMPETENCIAS CIUDADANAS",
    porcent: "CC",
  },
  {
    mod: "INGLÉS",
    porcent: "ING",
  },
];

const Interpretacion = () => {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>MÓDULOS</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>SIGLAS DEL MÓDULO</Text>
        </View>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>{item.mod}</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>{item.porcent}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Interpretacion;
