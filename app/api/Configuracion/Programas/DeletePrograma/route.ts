import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [DeleteGrados]: any = await connectionPool.query(`
    DELETE FROM pfc_programa WHERE pro_id = ${id}
    `);
    if (DeleteGrados.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar el programa" },
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
