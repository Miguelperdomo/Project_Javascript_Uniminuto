import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { data, text, competencia, prueba, semestre, IdRol, IdUser } =
      await req?.json();

    const [competencias]: any = await connectionPool.query(
      `SELECT eje_id, eje_nom  FROM asignacionPrueba INNER JOIN pfc_ejes ON pfc_ejes.eje_id = asignacionPrueba.competencia WHERE prueba = ${prueba}`
    );

    const competenciaFind = competencias.filter((e: any) =>
      e.eje_nom.toLowerCase().includes(`${competencia.toLowerCase()}`)
    );

    const [padre]: any = await connectionPool.query(
      `INSERT INTO preguntas_pruebas(tipo,pregunta,competencia,prueba,IdDocente) VALUES(3,'${text}','${competenciaFind[0]?.eje_id}','${prueba}','${IdUser}')`
    );

    let sql = `INSERT INTO preguntas_pruebas(tipo,padre,pregunta,opciones,respuesta,punto,competencia,prueba) VALUES `;
    data.forEach(async (element: any) => {
      let Opciones = "";
      element?.Opciones.map((pre: any, key: number) => {
        Opciones += `${pre}~${element?.Respuestas[key]}@`;
      });
      sql += `(100,${padre?.insertId || 0},'${
        element?.Pregunta
      }','${Opciones}','${element?.correcta}','${element?.puntos}','${
        competenciaFind[0]?.eje_id
      }','${prueba}'),`;
    });
    console.log("============================PADRE");
    console.log(padre);
    console.log("============================HIJO");
    console.log(sql.substring(0, sql.length - 1));
    sql = sql.substring(0, sql.length - 1);
    const [query2] = await connectionPool.query(`${sql}`);

    return NextResponse.json(
      { body: "La información fue ingresada con exito" },
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
