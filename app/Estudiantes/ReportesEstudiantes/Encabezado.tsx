// "use client";
// import React from "react";
// import { View, Text, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   marginDocument: {
//     border: "2px solid black",
//     height: "10vh",
//     width: "97%",
//     margin: "1vh",
//     display: "flex",
//     fontSize: "12px",
//     padding: "1%",
//   },
// });

// const Encabezado = ({ nombresApellidos }: any) => (
//   <View style={styles.marginDocument}>
//     <Text>Nombres y apellidos: {nombresApellidos}</Text>
//   </View>
// );

// export default Encabezado;

"use client";
import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  marginDocument: {
    border: "2px solid black",
    height: "10vh",
    width: "97%",
    margin: "1vh",
    display: "flex",
    fontSize: "12px",
    padding: "1%",
  },

  table: {
    display: "table" as any,
    width: "auto",
    heigth: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: "1%",
  },
  tableRow: {
    // margin: "auto",
    flexDirection: "row",
  },
  tableColImage: {
    width: "10%",
    height: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColText: {
    width: "90%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 1,
    fontSize: 13,
  },
});

const Encabezado = ({ InfoPdf }: any) => {
  return (
    <View style={styles.marginDocument}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColImage}>
            <View style={styles.tableCell}>
              <Image
                src="/EscudoUniminuto.png"
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
          <View style={styles.tableColText}>
            <Text style={styles.tableCell}>
              CORPORACIÓN UNIVERSITARIA MINUTO DE DIOS
            </Text>
            {/* <Text style={styles.tableCell}>
              Resolución de aprobación es 00002629 de 09 de noviembre de 2016
            </Text> */}
            <Text style={styles.tableCell}>
              {InfoPdf?.DatosUniversidad?.siglaUniversidad || ""}
            </Text>

            <Text style={styles.tableCell}>
              NIT. 8001162172 {InfoPdf?.DatosUniversidad.nit || ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Encabezado;
