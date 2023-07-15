import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [DeleteRectoria]: any = await connectionPool.query(`
      DELETE FROM rectorias WHERE id = '${id}'
      `);
    if (DeleteRectoria.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar la rectoria" },
        {
          status: 400,
        }
      );
    }

    const [VerificarSedes]: any = await connectionPool.query(
      `SELECT id FROM subSedes WHERE idSede = '${id}' `
    );

    if (VerificarSedes?.length > 0) {
      for (const item of VerificarSedes) {
        const [DeleteUsuarios]: any = await connectionPool.query(`
          DELETE FROM usuario WHERE subsede = '${item.id}'`);
      }
    }
    const [DeleteSede]: any = await connectionPool.query(`
      DELETE FROM sedes WHERE idRectoria = '${id}'`);

    if (DeleteSede?.affectedRows === 0) {
      return NextResponse.json(
        {
          body: "No se pudo realizar la eliminación de las sedes debido a la falta de sedes vinculadas.",
        },
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
