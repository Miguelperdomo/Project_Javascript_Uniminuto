import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { Pregunta, idPregunta, TipoPreguntas, OptionsQuestion } =
      await req?.json();
    console.log(OptionsQuestion.join("@"));

    if (TipoPreguntas == 3) {
      const [UpdateAprobacionPrueba]: any = await connectionPool.query(
        `UPDATE preguntas_pruebas SET aprobo = '2',pregunta = '${Pregunta}' ,opciones='${OptionsQuestion.join(
          "@"
        )}' WHERE id = '${idPregunta}'`
      );
      const [UpdateSubPreguntas]: any = await connectionPool.query(
        `UPDATE preguntas_pruebas SET aprobo = '2' ,opciones='${OptionsQuestion.join(
          "@"
        )}' WHERE padre = '${idPregunta}'`
      );
    } else {
      const [UpdateAprobacionPrueba]: any = await connectionPool.query(
        `UPDATE preguntas_pruebas SET aprobo = '2',pregunta = '${Pregunta}',opciones='${OptionsQuestion.join(
          "@"
        )}' WHERE id = '${idPregunta}'`
      );
    }

    return NextResponse.json(
      {
        body: "Pregunta aprobada correctamente",
      },
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
