import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const Periodicidad = searchParams.get("Periodicidad") || "";
  const Programa = searchParams.get("Programa") || "";
  const Semestre = searchParams.get("Semestre") || "";
  const IdSubSede = searchParams.get("IdSubSede") || "";

  try {
    const [LectivoRes]: any = await connectionPool.query(
      `SELECT DISTINCT(SemestreLectivo.Id) as IdPeriodicidad, SemestreLectivo.Nombre,SemestreLectivo.Meses,SemestreLectivo.END,SemestreLectivo.START as StartStudent FROM pfc_grados INNER JOIN SemestreLectivo ON SemestreLectivo.Id=pfc_grados.pfc_grado_sem INNER JOIN pfc_programa ON pfc_programa.pro_id=pfc_grados.pro_id WHERE pfc_grados.pro_id='${Programa}' AND pfc_grados.sem_id='${Semestre}' AND SemestreLectivo.Periodicidad= '${Periodicidad}' ${
        IdSubSede && IdSubSede != "0"
          ? `and pfc_grados.subSedeId = '${IdSubSede}'`
          : ""
      } order by SemestreLectivo.Id asc`
    );

    return NextResponse.json(
      { semestreLectivo: LectivoRes },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
