import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";
import { SemestreAcademico } from "../../../../typings";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { Values } = await req?.json();

    let Semestre: SemestreAcademico[] = [];

    if (Values.TipoPrueba == "SP") {
      Semestre = [
        {
          Id: 1,
          Nombre: "Semestre I",
          Numero: "I",
        },
        {
          Id: 3,
          Nombre: "Semestre III",
          Numero: "III",
        },
        {
          Id: 6,
          Nombre: "Semestre VI",
          Numero: "VI",
        },
        {
          Id: 9,
          Nombre: "Semestre IX",
          Numero: "IX",
        },
      ];
    } else {
      const [SemestreRes]: any = await connectionPool.query(`
        SELECT sem_id as Id,sem_nom as Nombre FROM parametros_pruebas INNER JOIN pfc_semestre ON pfc_semestre.sem_id = parametros_pruebas.semestre WHERE tipo="SS" AND programa=${
          Values?.Programa
        } AND ${(SubSede && `subSedeId = ${SubSede}`) || "1=1"} ORDER BY sem_id
  
      `);
      // ordenar SemestreRes por Nombre de forma ascendente

      Semestre = SemestreRes;
    }

    return NextResponse.json(
      { semestres: Semestre },
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
