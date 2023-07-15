"use client";
import React from "react";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";

const MyDoc = () => (
  <Document title="Reporte Pdf" author="Ivhorsnet">
    <Page size="A4" wrap={true}></Page>
  </Document>
);

const Reporte = () => {
  return (
    <div>
      <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Reporte;
