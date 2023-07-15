import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { Documento } = await req?.json();
    const [DocenteRes]: any = await connectionPool.query(
      `SELECT tipo_docu_id as TipoDocumento FROM dcne WHERE dcne_num_docu='${Documento}'
        `
    );

    return NextResponse.json(
      { docente: DocenteRes[0] },
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
