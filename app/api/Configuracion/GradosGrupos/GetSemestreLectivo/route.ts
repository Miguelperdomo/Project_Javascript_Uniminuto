import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const Periodisidad = searchParams.get("Periodisidad") || "";

  try {
    const [LectivoRes]: any = await connectionPool.query(
      `SELECT * FROM SemestreLectivo where Periodicidad='${Periodisidad}'`
    );

    const [SemestresRes]: any = await connectionPool.query(
      `SELECT sem_id as Id, sem_nom as Nombre, sem_num as Numero FROM pfc_semestre`
    );

    return NextResponse.json(
      { semestreLectivo: LectivoRes, Semestres: SemestresRes },
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
