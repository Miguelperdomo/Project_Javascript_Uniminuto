import { NextResponse } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET() {
  try {
    console.log("GetModulos");

    const [Modulos]: any = await connectionPool.query(
      "SELECT mod_id as Id, mod_nombre as Nombre FROM NewModulosSygescol WHERE submod_id = 0"
    );

    let Menu = [];
    if (Modulos?.length > 0) {
      for (const Module of Modulos) {
        const [SubModulos]: any = await connectionPool.query(
          `select mod_nombre as SubModulo,mod_image as Icon,mod_link as Link ,mod_id as id from NewModulosSygescol where submod_id = ${Module?.Id} and submod_id != 0`
        );

        Menu.push({
          Id: Module?.Id,
          NombreModulo: Module?.Nombre,
          SubModulos: SubModulos || [],
        });
      }
    }
    return NextResponse.json(
      { Modulos: Menu || [] },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
