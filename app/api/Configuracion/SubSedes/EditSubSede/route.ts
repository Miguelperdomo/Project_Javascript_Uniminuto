import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    const { IdSubSede, NombreSubSede, IdSede } = await req?.json();

    const [EditSubSede]: any = await connectionPool.query(`
      UPDATE subSedes SET nombre = '${NombreSubSede}',idSede='${IdSede}'  WHERE id = '${IdSubSede}'`);

    if (EditSubSede?.affectedRows === 0) {
      return NextResponse.json(
        { body: "COA no encontrado" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { body: "COA editado con éxito" },
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
