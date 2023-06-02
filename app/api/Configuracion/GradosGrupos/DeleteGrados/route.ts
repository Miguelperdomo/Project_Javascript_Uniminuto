import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [DeleteGrados]: any = await connectionPool.query(`
      DELETE FROM pfc_grados WHERE pfc_grado_id = ${id}
      `);
    if (DeleteGrados.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar el semestre" },
        {
          status: 400,
        }
      );
    }
    const [DeleteGrupos]: any = await connectionPool.query(`
      DELETE FROM pfc_grupos WHERE pfc_grado_id = ${id}
      `);
    if (DeleteGrupos.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar los grupos correctamente" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { message: "Se eliminó correctamente" },
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
