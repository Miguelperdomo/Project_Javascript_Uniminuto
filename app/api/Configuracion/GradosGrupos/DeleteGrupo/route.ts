import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [Grupo]: any = await connectionPool.query(`
    DELETE FROM pfc_grupos WHERE pfc_grupo_id = ${id}
    `);

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
