import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { competencia, prueba, IdUser } = await req?.json();

    const [informacion]: any = await connectionPool.query(
      `SELECT preguntas_pruebas.id as Id,preguntas_pruebas.tipo as TipoPregunta,preguntas_pruebas.padre, preguntas_pruebas.pregunta as Pregunta,preguntas_pruebas.opciones,preguntas_pruebas.respuesta,preguntas_pruebas.punto, preguntas_pruebas.aprobo,preguntas_pruebas.MsnRechazo FROM preguntas_pruebas  INNER JOIN asignacionPrueba ON asignacionPrueba.prueba=preguntas_pruebas.prueba WHERE asignacionPrueba.docente='${IdUser}' AND asignacionPrueba.prueba='${prueba}' and asignacionPrueba.competencia='${competencia}'`
    );
    const [retro]: any = await connectionPool.query(
      "SELECT * FROM retroalimentacionPregunta"
    );
    let newData: any[] = [];

    for (const item of informacion) {
      if (item.TipoPregunta == 3) {
        newData.push({
          ...item,
          Preguntas: [],
        });
      } else {
        if (item.TipoPregunta != 100) {
          newData.push({
            ...item,
            retro: retro.filter((ret: any) => ret.pregunta == item.Id),
          });
        }

        if (item.TipoPregunta == 100) {
          const keyIndex = newData?.findIndex((x) => x.Id == item.padre);
          newData[keyIndex]?.Preguntas?.push({
            ...item,
            retro: retro.filter((ret: any) => ret.pregunta == item.Id),
          });
        }
      }
    }
    return NextResponse.json({
      informacion: newData,

      status: 200,
    });
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
