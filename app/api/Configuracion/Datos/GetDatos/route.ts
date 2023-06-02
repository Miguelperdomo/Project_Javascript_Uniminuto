import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {
    const SubSede = searchParams.get("SubSede");
    const [InfoBaseRes]: any = await connectionPool.query(
      `SELECT datosUniversidad.*, subSedes.nombre as NombreSubSede FROM datosUniversidad INNER JOIN subSedes ON subSedes.id= datosUniversidad.idCoa where datosUniversidad.idCoa ='${SubSede}' `
    );

    const [Municipios]: any = await connectionPool.query(`
    SELECT * FROM municipio ORDER BY municipio_nombre ASC
    `);

    return NextResponse.json(
      { InfoBase: InfoBaseRes[0], Municipios: Municipios },
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
