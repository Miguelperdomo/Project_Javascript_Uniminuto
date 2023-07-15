import Title from "@/app/Title";
import React from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import BodyComponent from "./BodyComponent";

function page() {
  return (
    <>
      <Title title="Reportes " />
      <div className="md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center bg-[#0c1790] mt-4 text-center p-3 rounded-lg gap-2 mx-4 md:mx-auto">
        <h1 className="text-white lg:text-2xl font-medium">
          Seleccione Prueba para ver el reporte
        </h1>
        <FaArrowCircleDown className="text-white text-2xl animate-bounce" />
      </div>
      <BodyComponent />
    </>
  );
}

export default page;
