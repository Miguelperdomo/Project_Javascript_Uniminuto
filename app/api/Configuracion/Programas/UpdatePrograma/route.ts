import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    const { Nombre, Sigla, Id, Periodicidad } = await req?.json();

    const [UpdatePrograma]: any = await connectionPool.query(
      `update pfc_programa set pro_nom='${Nombre?.toUpperCase()
        ?.replace(/\s+/g, " ")
        .trim()}',pro_sigla='${
        Sigla?.toUpperCase() || ""
      }',Periodicidad='${Periodicidad}'  where pro_id=${Id}`
    );

    if (UpdatePrograma?.affectedRows === 0) {
      return NextResponse.json(
        {
          body: "No se puedo actualizar el programa",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { body: "Programa actualizado con éxito" },
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
