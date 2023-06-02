import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [DeleteGrados]: any = await connectionPool.query(`
    DELETE FROM subSedes WHERE id = '${id}'
    `);
    if (DeleteGrados.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar el programa" },
        {
          status: 400,
        }
      );
    }

    const [DeleteUniversidad]: any = await connectionPool.query(`
    DELETE FROM datosUniversidad WHERE idCoa = '${id}'
    `);
    if (DeleteUniversidad.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar los datos de la universidad" },
        {
          status: 400,
        }
      );
    }

    // delete usuarios
    const [DeleteUsuarios]: any = await connectionPool.query(`
    DELETE FROM usuario WHERE subsede = '${id}'`);

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
