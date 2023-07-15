import BodyComponent from "./BodyComponent";

const Requerimiento = async () => {
  // const data = await fetch(
  //   `${
  //     process.env.URL || "http://localhost:3000"
  //   }/api/Configuracion/CargaMasiva/GetStudents`,
  //   { cache: "no-store" }
  // ).then((res) => res.json());

  // const { estudiantes } = data;

  const estudiantes: [] = [];
  return (
    <>
      <BodyComponent data={estudiantes} />
    </>
  );
};

export default Requerimiento;
