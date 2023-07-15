import React from "react";
import Title from "../../Title";
import Parametrizacion from "./Parametrizacion";

const ParametrosGenerales = async () => {
  //   const data = await fetch(
  //     `${
  //       process.env.URL || "http://localhost:3000"
  //     }/api/Configuracion/Datos/MunicipioSelected`,
  //     { cache: "no-store" }
  //   ).then((res) => res.json());

  //   const { IndexSelected } = data;
  return (
    <>
      <Title title="PARÁMETROS GENERALES" />
      <Parametrizacion />
    </>
  );
};

export default ParametrosGenerales;
