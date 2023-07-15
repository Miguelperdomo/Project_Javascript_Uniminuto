import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { id } = await req?.json();
    const [DeleteCompetencias]: any = await connectionPool.query(`
    DELETE FROM pfc_ejes WHERE eje_id = ${id}
    `);
    if (DeleteCompetencias.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo eliminar la competencia" },
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
