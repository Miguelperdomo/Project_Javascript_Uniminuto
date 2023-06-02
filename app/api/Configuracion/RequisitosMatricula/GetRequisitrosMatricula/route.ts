import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [RequisitosMatriculaRes]: any = await connectionPool.query(
      `SELECT requisitos_matricula.rm_id as Id, requisitos_matricula.rm_nombre as Nombre, requisitos_matricula.rm_tipo as Tipo, requisitos_matricula.rm_para_quien as Target FROM requisitos_matricula ORDER BY requisitos_matricula.rm_nombre`
    );

    return NextResponse.json(
      { requisitosMatricula: RequisitosMatriculaRes },
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
