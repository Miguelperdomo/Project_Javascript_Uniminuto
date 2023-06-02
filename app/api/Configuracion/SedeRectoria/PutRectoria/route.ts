import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { NombreRectoria, Rectoria } = await req?.json();

    const [UpdateRectoria]: any = await connectionPool.query(`
      UPDATE rectorias SET nombre = '${NombreRectoria?.toUpperCase()}' WHERE id = '${Rectoria}'`);

    if (UpdateRectoria?.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo actualizar la rectoria" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { body: "Rectoría actualizada con éxito" },
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
