"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Canvas,
} from "@react-pdf/renderer";
import Tabla1 from "./Tabla1";
import Tabla2 from "./Tabla2";
import Encabezado from "./Encabezado";
import Grafica from "./Grafica";
import DatosUser from "./DatosUser";
import Interpretacion from "./Interpretacion";
import ReporteResult from "./ReporteResult";
import Grafica2 from "./Grafica2";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    // backgroundColor: "#fff",
    backgroundColor: "#EFEFF0",
  },

  title: {
    fontSize: 24,
    margin: "2%",
    marginLeft: "42%",
  },

  title2: {
    fontSize: 24,
    margin: "2%",
    marginLeft: "38%",
  },

  subtitle: {
    fontSize: 16,
    margin: "0.5%",
    marginLeft: "32%",
    marginTop: "5%",
  },

  subtitle2: {
    fontSize: 16,
    margin: "0.5%",
    marginLeft: "32%",
    marginTop: "5%",
  },

  subtitle3: {
    fontSize: 16,
    margin: "0.5%",
    marginLeft: "29%",
  },

  marginDocument: {
    border: "2px solid black",
    height: "98vh",
    width: "98%",
    margin: "1vh",
    display: "flex",
  },
});

const MyDocument = ({ InfoPdf }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.marginDocument}>
          <Encabezado InfoPdf={InfoPdf} />
          <Text style={styles.title2}>Datos del Usuario</Text>
          <DatosUser InfoPdf={InfoPdf} />
          <Text style={styles.title}>Resultados</Text>
          <ReporteResult />
          <Text style={styles.subtitle2}>Módulo Competencias Genéricas</Text>
          <Tabla1 InfoPdf={InfoPdf} />
          <Tabla2 InfoPdf={InfoPdf} />
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.marginDocument}>
          <Encabezado InfoPdf={InfoPdf} />
          <Text style={styles.title}>Porcentaje </Text>
          {/* <Text style={styles.subtitle3}>Módulo de Competencias Genéricas</Text> */}
          <Text style={styles.subtitle3}>
            Resultado Individual vs. Promedio General{" "}
          </Text>
          <Grafica2 InfoPdf={InfoPdf} />
          <Text style={styles.subtitle}>Cómo Interpretar la Prueba</Text>
          <Interpretacion />
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
