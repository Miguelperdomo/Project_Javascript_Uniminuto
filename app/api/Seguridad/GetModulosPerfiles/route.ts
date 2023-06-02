import { NextResponse } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET() {
  try {
    const [PerfilesRes]: any = await connectionPool.query(
      "SELECT rol_id as Id, roltip_id as Tipo, rol_nombre as Nombre  FROM rol  where rol_id != 1 and rol_id != 5 ORDER BY (roltip_id ) ASC "
    );

    return NextResponse.json(
      { perfiles: PerfilesRes },
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
