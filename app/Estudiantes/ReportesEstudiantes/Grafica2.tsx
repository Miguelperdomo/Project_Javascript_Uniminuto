"use client";
import React from "react";
import ReactPDF, {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Define los datos para el gráfico
// const data = [
//   { month: "CE", sales: 10 },
//   { month: "RC", sales: 20 },
//   { month: "LC", sales: 30 },
//   { month: "CC", sales: 40 },
//   { month: "ING", sales: 50 },
//   { month: "CE", sales: 60 },
//   { month: "ING", sales: 70 },
// ];
const myData = [
  { subject: "CE", score: 100 },
  { subject: "RC", score: 150 },
  { subject: "LC", score: 190 },
  { subject: "CC", score: 280 },
  { subject: "ING", score: 225 },
  { subject: "CC", score: 260 },
  { subject: "ING", score: 300 },
];

// Define los estilos para el gráfico y el plano cartesiano
const styles = StyleSheet.create({
  chartContainer: {
    marginTop: "10%",
    width: "110%",
    height: 200,
    flexDirection: "row",
    margin: "10%",
    marginLeft: "17%",
  },
  barContainer: {
    flexGrow: 1,
    margin: "1%",
    backgroundColor: "#070e54",
    position: "relative",
    opacity: 0.8,
  },
  barLabel: {
    // position: "absolute",
    // bottom: -7,
    left: 8,
    right: 0,
    textAlign: "center",
    color: "#fff",
  },
  axisContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 50,
  },
  yAxisLabel: {
    width: 30,
    height: "100%",
    textAlign: "right",
    color: "#555",
  },
  xAxisLabel: {
    width: "100%",
    textAlign: "center",
    color: "#555",
    paddingTop: 3,
    marginLeft: 63,
  },
  axisLine: {
    width: "100%",
    height: 1,
    marginLeft: "10%",
    backgroundColor: "#555",
  },
});

// const Grafica2 = () => {
//   // Ordena los datos por las ventas en orden ascendente
//   const sortedData = [...data].sort((a, b) => a.sales - b.sales);

//   // Obtiene el máximo de ventas para calcular la altura de las barras
//   const maxSales = Math.max(...data.map((item) => item.sales));
//   const minSales = Math.min(...data.map((item) => item.sales));

//   // Define el ancho y alto del gráfico
//   const width = 400;
//   const height = 300;

//   return (
//     <View style={{ width, height }}>
//       {/* Dibuja el eje Y */}
//       <View style={[styles.axisContainer, { height }]}>
//         <View style={{ height: "100%", justifyContent: "space-between" }}>
//           <Text style={styles.yAxisLabel}>{maxSales.toFixed(2)}</Text>
//           <Text style={styles.yAxisLabel}>
//             {((maxSales + minSales) / 2).toFixed(2)}
//           </Text>
//           <Text style={styles.yAxisLabel}>{minSales.toFixed(2)}</Text>
//         </View>
//         <View style={styles.axisLine} />
//       </View>

//       {/* Dibuja las barras y los textos */}
//       <View style={styles.chartContainer}>
//         {sortedData.map((item) => (
//           <View key={item.month} style={styles.barContainer}>
//             <View
//               style={{
//                 // height: ((item.sales / maxSales) * 100 * (height - 150)) / 100,
//                 height:
//                   (((maxSales - item.sales) / maxSales) *
//                     100 *
//                     (height - 100)) /
//                   100,
//                 backgroundColor: "white",
//               }}
//             />
//             <Text style={styles.barLabel}>
//               <Text style={{ fontSize: 14 }}>
//                 {(
//                   ((item.sales - minSales) / (maxSales - minSales)) *
//                   100
//                 ).toFixed(2)}
//                 %
//               </Text>
//               {"\n"}
//               {/* {item.month} */}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* Dibuja el eje X */}
//       <View style={[styles.axisContainer, { width }]}>
//         {data.map((item, index) => (
//           <Text key={index} style={styles.xAxisLabel}>
//             {item.month}
//           </Text>
//         ))}
//         <View style={styles.axisLine} />
//       </View>
//     </View>
//   );
// };

const Grafica2 = ({ InfoPdf }: any) => {
  // Ordena los datos por las ventas en orden ascendente
  // const sortedData = [...data].sort((a, b) => a.score - b.score);
  const sortedData = [...myData].sort((a, b) => a.score - b.score);

  // Obtiene el máximo de ventas para calcular la altura de las barras
  // const maxSales = Math.max(...data.map((item) => item.sales));
  // const minSales = Math.min(...data.map((item) => item.sales));
  const maxScore = Math.max(...myData.map((item) => item.score));
  const minScore = Math.min(...myData.map((item) => item.score));

  // Define el ancho y alto del gráfico
  const width = 400;
  const height = 300;

  return (
    <View style={{ width, height }}>
      {/* Dibuja el eje Y */}
      <View style={[styles.axisContainer, { height }]}>
        <View style={{ height: "100%", justifyContent: "space-between" }}>
          <Text style={styles.yAxisLabel}>{maxScore.toFixed(2)}</Text>
          <Text style={styles.yAxisLabel}>
            {((maxScore + minScore) / 2).toFixed(2)}
          </Text>
          <Text style={styles.yAxisLabel}>{minScore.toFixed(2)}</Text>
        </View>
        <View style={styles.axisLine} />
      </View>

      {/* Dibuja las barras y los textos */}
      <View style={styles.chartContainer}>
        {sortedData.map((item) => (
          <View key={item.subject} style={styles.barContainer}>
            <View
              style={{
                // height: ((item.sales / maxSales) * 100 * (height - 150)) / 100,
                height:
                  (((maxScore - item.score) / maxScore) *
                    100 *
                    (height - 100)) /
                  78,

                backgroundColor: "white",
              }}
            />
            <Text style={styles.barLabel}>
              <Text style={{ fontSize: 14 }}>
                {(
                  ((item.score - minScore) / (maxScore - minScore)) *
                  100
                ).toFixed(0)}
                %
              </Text>
              {"\n"}
              {/* {item.month} */}
            </Text>
          </View>
        ))}
      </View>

      {/* Dibuja el eje X */}
      <View style={[styles.axisContainer, { width }]}>
        {myData.map((item: any, index: any) => (
          <Text key={index} style={styles.xAxisLabel}>
            {item.subject}
          </Text>
        ))}
        <View style={styles.axisLine} />
      </View>
    </View>
  );
};

export default Grafica2;
