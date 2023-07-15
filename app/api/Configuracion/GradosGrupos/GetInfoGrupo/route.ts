import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
      await req?.json();
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
