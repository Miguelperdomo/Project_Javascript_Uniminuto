import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [ModuloDelate]: any = await connectionPool.query(`
    DELETE FROM NewModulosSygescol WHERE mod_id = ${id}
    `);

    if (ModuloDelate.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar " },
        {
          status: 400,
        }
      );
    }
    const [PermisosUsuario]: any = await connectionPool.query(`
    DELETE FROM ModulosPerfilAcceso WHERE mod_id = ${id}
    `);

    if (PermisosUsuario.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se encontraron usuarios con ese módulo" },
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
