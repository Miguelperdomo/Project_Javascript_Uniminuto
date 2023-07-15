import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";
import { abecedario } from "../../../../../utils/Abecedario";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const {
      pregunta,
      correcta,
      respuestas,
      textos,
      punto,
      competencia,
      semestre,
      prueba,
      retro,
      IdRol,
      IdUser,
    } = await req?.json();

    let respuestasFormated = "";
    respuestas.map((res: any, key: number) => {
      respuestasFormated = `${respuestasFormated}${res}~${textos[key]}@`;
    });
    const [competencias]: any = await connectionPool.query(
      "SELECT eje_nom,eje_id FROM pfc_ejes"
    );
    const competenciaFind = competencias.filter((e: any) =>
      e.eje_nom.toLowerCase().includes(`${competencia.toLowerCase()}`)
    );
    const [ingreso]: any = await connectionPool.query(
      `INSERT INTO preguntas_pruebas(tipo,pregunta,opciones,respuesta,punto,competencia,prueba,aprobo,IdDocente) VALUES(1, '${pregunta}', '${respuestasFormated}','${correcta}', ${punto},  '${competenciaFind[0]?.eje_id}', '${prueba}', 0,'${IdUser}')`
    );
    if (retro?.length > 0) {
      const id = ingreso?.insertId;
      let sql = "";
      retro?.map((ret: any, key: number) => {
        let letra = abecedario[key];
        sql += `('${id}','${letra}','${ret}'),`;
      });
      sql = sql.substring(0, sql.length - 1);
      const [retroalimentacion] = await connectionPool.query(
        `INSERT INTO retroalimentacionPregunta(pregunta, posicion, texto) VALUES ${sql}`
      );
    }
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
