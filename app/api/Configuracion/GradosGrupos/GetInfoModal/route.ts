import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [ProgramaRes]: any = await connectionPool.query(
      `SELECT pro_id as Id,pro_nom as Nombre,pro_sigla as Sigla,periodicidad as Periodisidad FROM pfc_programa ${
        SubSede && SubSede != "0"
          ? `where pfc_programa.subSedeId = '${SubSede}'`
          : ""
      }  ORDER BY pro_nom`
    );

    return NextResponse.json(
      { programa: ProgramaRes },
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
