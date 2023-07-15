import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { prueba, semestre, competencia } = await req?.json();
    const [max]: any = await connectionPool.query(
      "SELECT valor FROM criterios_evaluacion WHERE id = 1"
    );
    let puntos = max[0]?.valor;
    const [competencias]: any = await connectionPool.query(
      "SELECT eje_nom, eje_id FROM pfc_ejes"
    );
    const competenciaFind = competencias.filter((e: any) =>
      e.eje_nom.toLowerCase().includes(`${competencia.toLowerCase()}`)
    );
    const [preguntas]: any = await connectionPool.query(
      `SELECT punto FROM preguntas_pruebas WHERE competencia = ${
        competenciaFind[0]?.eje_id || ""
      } AND prueba = ${prueba}`
    );
    preguntas.map((e: any) => {
      console.log(`${parseInt(puntos)}- ${parseInt(e?.punto)}`);
      puntos = parseInt(puntos) - parseInt(e?.punto);
    });
    return NextResponse.json(
      { puntos },
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
