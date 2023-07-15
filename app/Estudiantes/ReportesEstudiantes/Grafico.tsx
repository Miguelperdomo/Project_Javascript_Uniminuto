/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const Grafico = () => {
  const chartRef: any = useRef(null);

  const exportPDF = () => {
    // Obtener los datos del gráfico
    const chartInstance = chartRef.current.chartInstance;
    const data = chartInstance.data;

    // Crear una imagen a partir del canvas del gráfico
    const canvas = chartInstance.canvas;
    const imgData = canvas.toDataURL("image/png");

    // Crear el objeto PDF
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 10,
      },
      chart: {
        width: 500,
        height: 250,
        marginBottom: 10,
      },
      title: {
        fontSize: 18,
        marginBottom: 10,
      },
      table: {
        width: 500,
        marginBottom: 10,
      },
      tableHeader: {
        backgroundColor: "#eeeeee",
        padding: 5,
        fontWeight: "bold",
      },
      tableRow: {
        padding: 5,
      },
      tableLabel: {
        width: 250,
      },
      tableValue: {
        width: 250,
      },
    });
    const doc = (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Gráfico de barras</Text>
          <Image style={styles.chart} src={imgData} />
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableLabel}>Etiqueta</Text>
              <Text style={styles.tableValue}>Valor</Text>
            </View>
            {data.labels.map((label: any, index: any) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableLabel}>{label}</Text>
                <Text style={styles.tableValue}>
                  {data.datasets[0].data[index]}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ventas",
        data: [10, 19, 3, 5, 2],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar ref={chartRef} data={data} options={options} />
      <button onClick={exportPDF}>Exportar a PDF</button>
    </div>
  );
};

export default Grafico;
