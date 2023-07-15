import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    const {
      Values: { Ubicacion },
      Id,
    } = await req?.json();

    const [UpdateGrupos]: any = await connectionPool.query(
      `UPDATE pfc_grupos SET pfc_grupo_ubi = '${Ubicacion?.toLowerCase()}' WHERE pfc_grupo_id=${Id}`
    );

    if (UpdateGrupos?.affectedRows === 0) {
      return NextResponse.json(
        { body: "Error al actualizar grupo" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { body: "Grupo Actualizado" },
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
