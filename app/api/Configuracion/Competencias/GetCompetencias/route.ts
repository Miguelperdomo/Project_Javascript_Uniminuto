import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [CompetenciaRes]: any = await connectionPool.query(
      `SELECT pfc_ejes.eje_id as Id,pfc_ejes.eje_nom as Nombre,pfc_ejes.eje_abr as Abreviatura,pfc_ejes.eje_tip as TipoCompetencia,pfc_ejes.eje_cons as Orden,subSedes.nombre as NombreSubSede FROM pfc_ejes INNER JOIN subSedes ON subSedes.id=pfc_ejes.subSedeId ${
        SubSede && SubSede != "0"
          ? `where pfc_ejes.subSedeId = '${SubSede}'`
          : ""
      } ORDER BY TipoCompetencia DESC`
    );

    return NextResponse.json(
      { competencia: CompetenciaRes },
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
