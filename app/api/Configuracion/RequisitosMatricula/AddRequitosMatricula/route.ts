import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { Nombre, Quien, Tipo } = await req?.json();

    const [RequisitoAdd]: any = await connectionPool.query(`
    INSERT INTO requisitos_matricula (rm_nombre, rm_tipo, rm_para_quien) values ('${
      Nombre || ""
    }', '${Tipo || ""}','${Quien || ""}')
    `);

    if (RequisitoAdd.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se puedo agregar el requisto de matricula" },
        {
          status: 400,
        }
      );
    }

    const Update = {
      Nombre: Nombre,
      Tipo: Tipo,
      Target: Quien,
    };

    return NextResponse.json(
      {
        requisito: Update,
        body: "Requisito de matricula agregado correctamente",
      },
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
