import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [DocumentosRes]: any = await connectionPool.query(
      `SELECT id as Id,codigo as Codigo,nombre as Nombre FROM tipo_docum ORDER BY tipo_docum.codigo ASC`
    );
    return NextResponse.json(
      { documentos: DocumentosRes },
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
