import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    // const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
    //   await req?.json();

    const { id } = await req?.json();

    const [AdministrativoDelete]: any = await connectionPool.query(`
    DELETE FROM admco WHERE id = ${id}
    `);
    if (AdministrativoDelete.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar el colaborador" },
        {
          status: 400,
        }
      );
    }
    const [UsuarioDelete]: any = await connectionPool.query(`
    DELETE FROM usuario WHERE idUsuario = ${id}
    `);
    if (UsuarioDelete.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar el usuario del colaborador" },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      { body: "El se colaborador elimino correctamente" },
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
