import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { Pregunta, Respuesta, Prueba, IdEstudiante } = await req?.json();

    const [IdMatricula]: any = await connectionPool.query(
      `select pfc_matricula.matri_id as MatriculaEstudiante FROM pfc_matricula INNER JOIN pfc_alumno ON pfc_alumno.alumno_id=pfc_matricula.alumno_id WHERE pfc_alumno.alumno_id='${IdEstudiante}'`
    );

    const [SaveRespuesta]: any = await connectionPool.query(`
      insert into respuestas_estudiante (estudiante,prueba,pregunta,respuesta) values ('${IdMatricula[0].MatriculaEstudiante}','${Prueba}','${Pregunta}','${Respuesta}')
      `);
    return NextResponse.json(
      { body: "Pregunta Guardada" },
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
