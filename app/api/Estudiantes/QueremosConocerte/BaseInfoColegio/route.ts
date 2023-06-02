import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [datosUniversidad]: any = await connectionPool.query(
      `SELECT * FROM subSedes INNER JOIN datosUniversidad ON datosUniversidad.idCoa=subSedes.id WHERE datosUniversidad.idCoa='${SubSede}'

        `
    );

    // falta agregar la validacion por sede

    return NextResponse.json(
      { DatosUniversidad: datosUniversidad[0] || [] },
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
