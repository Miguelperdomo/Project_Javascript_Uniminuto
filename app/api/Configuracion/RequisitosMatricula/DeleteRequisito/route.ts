import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { id } = await req?.json();

    const [AdministrativoDelete]: any = await connectionPool.query(`
      DELETE FROM requisitos_matricula WHERE rm_id = ${id}
      `);
    if (AdministrativoDelete.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar el Requisito" },
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
