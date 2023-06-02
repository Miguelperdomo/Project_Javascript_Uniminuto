import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
      await req?.json();

    const [ProgramaRes]: any = await connectionPool.query(
      `SELECT pro_id as Id,pro_nom as Nombre, pro_sigla as Sigla FROM pfc_programa ORDER BY pro_nom`
    );

    return NextResponse.json(
      { programas: ProgramaRes },
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
