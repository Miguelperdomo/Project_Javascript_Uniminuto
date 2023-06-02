import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../config/db";

export async function PUT(req: NextRequest) {
  // const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
  //   await req?.json();

  const { Pass, Id } = await req.json();
  try {
    const [PfcAlumno]: any = await connectionPool.query(`
    UPDATE usuario SET pass= '${Pass}', ChangePass=1 WHERE idUsuario = ${Id} 
    `);

    if (PfcAlumno?.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo actualizar la contraseña" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { body: "Contraseña actualizada con éxito" },
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
