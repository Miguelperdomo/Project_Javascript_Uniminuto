import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [ValidarSiHayAlumnos]: any = await connectionPool.query(
      `select max(id) as Cantidad from usuario`
    );

    if (ValidarSiHayAlumnos[0].Cantidad === 0) {
      return NextResponse.json(
        { body: "No hay estudiantes para eliminar" },
        {
          status: 400,
        }
      );
    }

    const [DeleteUsuarios]: any = await connectionPool.query(`
      delete FROM usuario WHERE rol=3 and subsede='${SubSede}'
      `);

    if (DeleteUsuarios.affectedRows === 0) {
      return NextResponse.json(
        {
          body: "No se pudo eliminar los estudiantes contacte con soporte",
        },
        {
          status: 400,
        }
      );
    }

    const [deleteAlumnosMatriculados]: any = await connectionPool.query(`
      delete pfc_alumno,pfc_matricula from pfc_alumno inner join pfc_matricula on pfc_alumno.alumno_id=pfc_matricula.alumno_id where pfc_matricula.subSedeId='${SubSede}'
      `);

    return NextResponse.json(
      { body: "Se borro los estudiantes" },
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
