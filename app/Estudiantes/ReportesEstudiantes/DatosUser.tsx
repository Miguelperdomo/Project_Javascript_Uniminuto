"use client";
import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
} from "@react-pdf/renderer";
import { colors } from "react-select/dist/declarations/src/theme";

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
  tableColTitle: {
    width: "33.3%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    // backgroundColor: "#CFD5E6",
    backgroundColor: "#075695",
    color: "white",
  },
  tableCol2: {
    width: "33.3%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    // backgroundColor: "#CFD5E6",
    // backgroundColor: "#74A8D1",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    padding: "3%",
  },
});

const data = [
  {
    nombre: "Brahian Andres Orozco Salguero",
    document: "1005813582",
    regist: " 31/03/2023",
  },
];

const DatosUser = ({ InfoPdf }: any) => {
  const { InformacionEstudiante } = InfoPdf;

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {/* <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Product</Text>
          </View> */}
        <View style={styles.tableColTitle}>
          <Text style={styles.tableCell}>NOMBRE Y APELLIDO</Text>
        </View>
        <View style={styles.tableColTitle}>
          <Text style={styles.tableCell}>DOCUMENTO DE IDENTIDAD</Text>
        </View>
        <View style={styles.tableColTitle}>
          <Text style={styles.tableCell}>FECHA DE LA PRUEBA</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        {/* <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.product}</Text>
            </View> */}
        <View style={styles.tableCol2}>
          <Text style={styles.tableCell}>
            {InformacionEstudiante.NombreCompleto}
          </Text>
        </View>
        <View style={styles.tableCol2}>
          <Text style={styles.tableCell}>
            {InformacionEstudiante.NumeroDocumento}
          </Text>
        </View>
        <View style={styles.tableCol2}>
          <Text style={styles.tableCell}>10/Abril/2023</Text>
        </View>
      </View>
    </View>
  );
};

export default DatosUser;
