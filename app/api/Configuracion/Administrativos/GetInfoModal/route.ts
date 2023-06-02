import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET() {
  try {
    const [TipoDocumentoRes]: any = await connectionPool.query(
      `SELECT tipo_docum.id, tipo_docum.nombre FROM tipo_docum ORDER BY tipo_docum.nombre`
    );
    const [RolRes]: any = await connectionPool.query(
      "SELECT rol_id as Id,rol_nombre as Nombre FROM rol WHERE roltip_id = 1 AND rol_id != 1"
    );

    return NextResponse.json(
      { documentos: TipoDocumentoRes, roles: RolRes },
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
