import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Table = ({ data }: any) => (
  <View style={styles.section}>
    <Text>Tabla de resultados:</Text>
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Text style={{ flex: 1 }}>Estudiante</Text>
      <Text style={{ flex: 1 }}>Resultado</Text>
    </View>
    {data.map((item: any) => (
      <View key={item.id} style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>{item.estudiante}</Text>
        <Text style={{ flex: 1 }}>{item.resultado}</Text>
      </View>
    ))}
  </View>
);

const ChartComponent = ({ data }: any) => (
  <View style={styles.section}>
    <Text>Gráfico de resultados:</Text>
    <Bar data={data} options={{ maintainAspectRatio: false }} />
  </View>
);

const MyPdf = ({ data, chartData }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Table data={data} />
      {/* <ChartComponent data={chartData} /> */}
    </Page>
  </Document>
);

export default MyPdf;
