import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const IdPrograma = searchParams.get("IdPrograma") || "";

  const IdSubSede = searchParams.get("IdSubSede") || "";

  try {
    const [SemestresRes]: any = await connectionPool.query(
      `SELECT DISTINCT(pfc_semestre.sem_id) as SemestreId,pfc_semestre.sem_nom as NombreSemestre, pfc_semestre.sem_num as Numero FROM pfc_semestre INNER JOIN pfc_grados ON pfc_grados.sem_id=pfc_semestre.sem_id INNER JOIN pfc_programa ON pfc_programa.pro_id=pfc_grados.pro_id WHERE pfc_programa.pro_id='${IdPrograma}' and pfc_programa.subSedeId='${IdSubSede}' ORDER BY (pfc_semestre.sem_id)`
    );
    return NextResponse.json(
      { semestres: SemestresRes },
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
