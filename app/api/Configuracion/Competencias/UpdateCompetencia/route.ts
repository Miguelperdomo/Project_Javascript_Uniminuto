import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { Id, Abreviatura, TipoCompetencia, IdSubSede, NombreCompetencia } =
      await req?.json();

    console.log(`
    UPDATE pfc_ejes SET eje_nom='${NombreCompetencia}', eje_abr='${Abreviatura}', subSedeId='${
      IdSubSede || ""
    }', eje_tip='${TipoCompetencia}' WHERE eje_id='${Id}'
    `);

    const [UpdateCompetencias]: any = await connectionPool.query(`
      UPDATE pfc_ejes SET eje_nom='${NombreCompetencia}', eje_abr='${Abreviatura}', subSedeId='${
      IdSubSede || ""
    }', eje_tip='${TipoCompetencia}' WHERE eje_id='${Id}'
      `);

    if (UpdateCompetencias?.affectedRows === 0) {
      return NextResponse.json(
        { body: "Error al actualizar la competencia" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { body: "Competencia Actualizada" },
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
