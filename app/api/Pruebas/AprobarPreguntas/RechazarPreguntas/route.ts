import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const {
      Pregunta,
      idPregunta,

      TipoPreguntas,
      MsnRechazo,
    } = await req?.json();

    if (TipoPreguntas == 3) {
      const [UpdateAprobacionPrueba]: any = await connectionPool.query(
        `UPDATE preguntas_pruebas SET aprobo = '1',pregunta = '${Pregunta}', MsnRechazo='${MsnRechazo}' WHERE id = '${idPregunta}'`
      );
      const [UpdateSubPreguntas]: any = await connectionPool.query(
        `UPDATE preguntas_pruebas SET aprobo = '1',MsnRechazo='${MsnRechazo}' WHERE padre = '${idPregunta}'`
      );
    } else {
      const [UpdateAprobacionPrueba]: any = await connectionPool.query(
        `UPDATE preguntas_pruebas SET aprobo = '1',pregunta = '${Pregunta}',MsnRechazo='${MsnRechazo}' WHERE id = '${idPregunta}'`
      );
    }

    const [DocenteAsignado]: any = await connectionPool.query(
      `SELECT preguntas_pruebas.IdDocente, parametros_pruebas.subSedeId FROM preguntas_pruebas INNER JOIN parametros_pruebas ON parametros_pruebas.id=preguntas_pruebas.prueba WHERE preguntas_pruebas.id='${idPregunta}'`
    );

    const [InsertNotificacion]: any = await connectionPool.query(`
      INSERT INTO notifications (Rol, user_id, message, Link) VALUES ('2', '${
        DocenteAsignado[0]?.IdDocente || 0
      }', 'Se ha devuelto una pregunta, por favor revise la bandeja de preguntas la cual identificara con color rojo.', '/Pruebas/IngresoPreguntas?SubSede=${
      DocenteAsignado[0]?.subSedeId || 0
    }&IdRol=2&IdUser=${DocenteAsignado[0]?.IdDocente || 0}')`);

    return NextResponse.json(
      {
        body: "Pregunta Rechazada correctamente",
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
