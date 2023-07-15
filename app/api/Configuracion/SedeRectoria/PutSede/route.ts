import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    const { NombreSede, SedeIdRectoria, IdSede } = await req?.json();
    const [UpdateSede]: any = await connectionPool.query(`
      UPDATE sedes SET nombreSede = '${NombreSede}', idRectoria = '${SedeIdRectoria}' WHERE id = '${IdSede}'`);

    if (UpdateSede?.affectedRows === 0) {
      return NextResponse.json(
        { body: "Sede no encontrada" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { body: "Sede actualizada" },
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
