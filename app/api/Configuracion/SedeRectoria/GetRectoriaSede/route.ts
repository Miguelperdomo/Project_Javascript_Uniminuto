import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  try {
    const [GetRectoriasRes]: any = await connectionPool.query(
      `
        SELECT rectorias.id as IdRectoria, sedes.id as IdSedes,rectorias.nombre as NombreRectoria, sedes.nombreSede as NombreSede, sedes.idRectoria as SedeIdRectoria FROM rectorias LEFT JOIN sedes ON (rectorias.id=sedes.idRectoria)
        `
    );

    const newData = GetRectoriasRes?.reduce((acc: any, item: any) => {
      const {
        IdRectoria,
        IdSedes,
        NombreRectoria,
        NombreSede,
        SedeIdRectoria,
      } = item;

      let key = ` ${IdRectoria}-${SedeIdRectoria}`;
      let value = { IdRectoria, NombreRectoria, Sedes: [] };

      if (!acc[key]) {
        acc[key] = value;
      }
      acc[key].Sedes.push({ IdSedes, NombreSede, SedeIdRectoria });
      return acc;
    }, {});

    return NextResponse.json(
      { RectoriasSedes: newData },
      {
        status: 500,
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
