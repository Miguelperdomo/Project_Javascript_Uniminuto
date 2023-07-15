import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../../config/db";

export async function GET(req: NextRequest) {
  try {
    const [ProgramasRes]: any = await connectionPool.query(
      `SELECT pro_id as Id,pro_nom as Nombre,pro_sigla as Sigla FROM pfc_programa      `
    );

    return NextResponse.json(
      { programas: ProgramasRes },
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
