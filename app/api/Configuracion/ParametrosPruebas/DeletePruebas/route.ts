import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { id } = await req?.json();

    const [DocenteDelete]: any = await connectionPool.query(`
      DELETE FROM parametros_pruebas WHERE id = ${id}
      `);
    if (DocenteDelete.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar la prueba" },
        {
          status: 400,
        }
      );
    }
    const [UsuarioDelete]: any = await connectionPool.query(`
      DELETE FROM asignacionPrueba WHERE prueba = ${id}
      `);
    if (UsuarioDelete.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar la asignación" },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      { body: "Se eliminó correctamente" },
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
