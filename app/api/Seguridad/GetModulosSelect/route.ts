import { NextResponse } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {
    const Id = searchParams?.get("Id");
    const [Modulos]: any = await connectionPool.query(
      "SELECT mod_id as Id, mod_nombre as Nombre FROM NewModulosSygescol WHERE submod_id = 0"
    );

    let Menu = [];
    if (Modulos?.length > 0) {
      for (const Module of Modulos) {
        const [SubModulos]: any = await connectionPool.query(
          `select mod_nombre as label ,mod_id as value from NewModulosSygescol where submod_id = ${Module?.Id} and submod_id != 0`
        );

        let SubModulosActivos = [];

        if (Id) {
          const [SubmodulosActivosRes]: any = await connectionPool.query(`
            select NewModulosSygescol.mod_nombre as label,NewModulosSygescol.mod_id as value from NewModulosSygescol INNER JOIN ModulosPerfilAcceso ON (ModulosPerfilAcceso.mod_id=NewModulosSygescol.mod_id) where NewModulosSygescol.submod_id = ${Module?.Id} and submod_id != 0 and ModulosPerfilAcceso.perfil_id = ${Id}
            `);

          SubModulosActivos = SubmodulosActivosRes;
        }

        Menu.push({
          Id: Module?.Id,
          NombreModulo: Module?.Nombre,
          SubModulos: SubModulos || [],
          SubModulosActivos: SubModulosActivos,
        });
      }
    }
    return NextResponse.json(
      { Modulos: Menu },
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
