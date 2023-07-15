"use client";
import React from "react";
import { GiLaptop } from "react-icons/gi";
import Title from "../../Title";
import ConsultaResulItems from "./ConsultaResulItems";

interface Props {}

function BodyComponent(props: Props) {
  const {} = props;

  return (
    <>
      <Title title="Consulta de Resultados para las Pruebas" />
      <div className="h-screen px-[2rem] mx-auto container grid grid-cols-2 items-center justify-center flex-col bg-slate-200">
        <ConsultaResulItems />
        {/* <ConsultaResulItems /> */}
      </div>
    </>
  );
}

export default BodyComponent;
