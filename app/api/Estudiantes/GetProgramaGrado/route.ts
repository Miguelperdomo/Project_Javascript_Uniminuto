import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";
  const IdPrograma = searchParams.get("IdPrograma") || "";
  const IdSemestre = searchParams.get("IdSemestre") || "";
  try {
    const [GruposRes]: any = await connectionPool.query(
      `SELECT pfc_grupos.pfc_grupo_id as Id, pfc_grupos.pfc_grupo_nom as Nombre FROM pfc_grupos INNER JOIN pfc_grados on (pfc_grados.pfc_grado_id=pfc_grupos.pfc_grado_id) WHERE pfc_grados.pro_id=${IdPrograma} and pfc_grados.sem_id = ${IdSemestre} ORDER BY pfc_grupos.pfc_grupo_nom ASC
        `
    );

    // falta agregar la validacion por sede

    return NextResponse.json(
      { grupos: GruposRes || [] },
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
