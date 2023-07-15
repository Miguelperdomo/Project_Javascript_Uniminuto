import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {
    const SubSede = searchParams.get("SubSede");

    const [GetMunicipioPrincipal]: any = await connectionPool.query(`
    SELECT municipioId as Municipio FROM datosUniversidad where idCoa = '${SubSede}' 
    `);

    const [GetMunicio]: any = await connectionPool.query(`
    select  municipio_id as Id  FROM municipio ORDER BY municipio_nombre ASC
    `);

    let IndexDefault = GetMunicio?.findIndex(
      (item: any) => item.Id == GetMunicipioPrincipal[0]?.Municipio
    );

    return NextResponse.json(
      { IndexSelected: IndexDefault },
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
