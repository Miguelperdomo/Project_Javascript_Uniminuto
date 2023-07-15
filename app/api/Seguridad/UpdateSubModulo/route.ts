import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    // const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
    //   await req?.json();

    const { Id, Nombre, ModuloPrincipal, Link } = await req?.json();
    const [updateSubModulo]: any = await connectionPool.query(`
    UPDATE NewModulosSygescol SET mod_nombre = '${Nombre?.toUpperCase()}', mod_link = '${Link}',submod_id='${ModuloPrincipal}' WHERE mod_id = ${Id}`);

    if (updateSubModulo.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo editar" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { body: "Se editó correctamente" },
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
