import BodyComponent from "./BodyComponent";

const ConfiguracionRegistro = async () => {
  //   const data = await fetch(
  //     `${
  //       process.env.URL || "http://localhost:3000"
  //     }/api/Configuracion/Docentes/GetDocentes`,
  //     { cache: "no-store" }
  //   ).then((res) => res.json());

  //   const ConfiguracionRegistro: ConfiguracionRegistro[] =
  //     data.ConfiguracionRegistro;
  const data = await fetch(
    `${
      process.env.URL || "http://localhost:3000"
    }/api/Configuracion/CargaMasiva/GetStudents`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const { estudiantes } = data;
  return (
    <>
      <BodyComponent data={estudiantes} />
    </>
  );
};

export default ConfiguracionRegistro;
