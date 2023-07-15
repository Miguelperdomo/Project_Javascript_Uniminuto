import { RequisitrosMatricula } from "../../../typings";
import BodyRequisitrosMatricula from "./BodyRequisitrosMatricula";

const RequisitosMatricula = async () => {
  const data = await fetch(
    `${
      process.env.URL || "http://localhost:3000"
    }/api/Configuracion/RequisitosMatricula/GetRequisitrosMatricula`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const requisitosMatricula: RequisitrosMatricula[] = data.requisitosMatricula;

  return (
    <>
      <BodyRequisitrosMatricula requisitosMatricula={requisitosMatricula} />
    </>
  );
};

export default RequisitosMatricula;
