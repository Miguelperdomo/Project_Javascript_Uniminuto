import Title from "@/app/Title";
import React from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import BodyComponent from "./BodyComponent";
import CompBackground from "./CompBackground";

function page() {
  return (
    <>
      <Title title="Reporte Resultados Prueba Saber para Administrativos" />
      <CompBackground />
      <div className="z-50 md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center bg-[#070E54] mt-4 text-center p-3 rounded-lg gap-2 mx-4 md:mx-auto border-2 border-white">
        <h1 className="text-white lg:text-2xl font-medium">
          Seleccione Programa, Semestre, Grupo, Competencia y Estudiante para
          ver el Reporte
        </h1>
        <FaArrowCircleDown className="text-white text-2xl animate-bounce" />
      </div>
      <BodyComponent />
    </>
  );
}

export default page;
