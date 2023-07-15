import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function POST(req: NextRequest) {
  const { IdPrueba, SubSede, IdRol, IdUser, Doc } = await req.json();

  console.log("IdPrueba", IdPrueba);

  try {
    const [InfoMatriculaEstudiante]: any = await connectionPool.query(
      `SELECT pfc_matricula.matri_id  FROM pfc_matricula INNER JOIN pfc_alumno ON pfc_alumno.alumno_id=pfc_matricula.alumno_id WHERE pfc_alumno.alumno_id=${IdUser}`
    );
    if (InfoMatriculaEstudiante?.length) {
      const { matri_id } = InfoMatriculaEstudiante[0];

      //   verificar existencia

      const [VerificarAsistencia]: any = await connectionPool.query(
        `SELECT id FROM asistenciaPruebas WHERE estudiante='${matri_id}' AND prueba='${IdPrueba}'`
      );

      console.log(
        `SELECT id FROM asistenciaPruebas WHERE estudiante='${matri_id}' AND prueba='${IdPrueba}'`
      );

      if (VerificarAsistencia?.length > 0) {
        const [UpdateAsistencia]: any = await connectionPool.query(
          `UPDATE asistenciaPruebas SET salida=1, hora_salida=NOW() WHERE estudiante='${matri_id}' AND prueba='${IdPrueba}'`
        );
        return NextResponse.json(
          {},
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          { body: "No se registro la fecha de ingreso" },
          {
            status: 200,
          }
        );
      }
    }
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
