import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  try {
    const [SedesSubSedesRes]: any = await connectionPool.query(`
    SELECT subSedes.id as IdSubSede, subSedes.nombre NombreSubSede, sedes.id as IdSede,sedes.nombreSede as NombreSede, subSedes.idSede as idSubSedeSede,rectorias.nombre as NombreRectoria FROM subSedes INNER JOIN sedes on (sedes.id=subSedes.idSede) INNER JOIN rectorias on rectorias.id=sedes.idRectoria ORDER BY idSubSedeSede ASC`);

    let newData = SedesSubSedesRes?.reduce((acc: any, item: any) => {
      let key = `${item.NombreRectoria}-${item.IdSede}-${item.idSubSedeSede}`;
      if (!acc[key]) {
        acc[key] = {
          NombreRectoria: item.NombreRectoria,
          IdSede: item.IdSede,
          NombreSede: item.NombreSede,
          SubSedes: [],
        };
      }
      acc[key].SubSedes.push({
        IdSubSede: item.IdSubSede,
        NombreSubSede: item.NombreSubSede,
      });
      return acc;
    }, []);

    return NextResponse.json(
      { SedesSubSedes: Object.values(newData) },
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
