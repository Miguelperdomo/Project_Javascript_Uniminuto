import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";
  const IdRol = searchParams.get("IdRol") || "";
  const IdUser = searchParams.get("IdUser") || "";

  try {
    await req?.json();
    const [RolTipo]: any = await connectionPool.query(
      `select rol.rol_nombre as NombreRol, rol_tipo.roltip_id as RolTipo, rol_tipo.roltip_id as RolTipoId from rol LEFT join rol_tipo on (rol.roltip_id=rol_tipo.roltip_id) where rol.rol_id=${IdRol}`
    );

    // profesor
    if (RolTipo[0]?.RolTipoId == "2") {
      const [pruebas]: any = await connectionPool.query(
        `SELECT * FROM asignacionPrueba inner join pfc_ejes on (pfc_ejes.pfc_ejes) WHERE docente=${IdUser}`
      );

      console.log(pruebas);
    }
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
