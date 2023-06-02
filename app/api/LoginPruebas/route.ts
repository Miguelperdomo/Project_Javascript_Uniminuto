import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../config/db";
import { User } from "../../../typings";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const {
      InputValues: { Usuario, Pass },
    } = await req?.json();

    let consulta = `SELECT usu_rol, rol_nombre FROM usuario 
    INNER JOIN rol ON usuario.usu_rol = rol.rol_id 
    WHERE usu_login = '${Usuario?.toLowerCase()}' AND usu_password = '${Pass}'`;
    // if (Usuario != "soporte") {
    //   consulta = `SELECT usu_rol, rol_nombre FROM usuario
    //                     INNER JOIN rol ON usuario.usu_rol = rol.rol_id
    //                     INNER JOIN admco ON usuario.idUsuario = admco.id
    //                     WHERE usu_login = '${Usuario}' AND usu_password = '${Pass}' `;
    // } else {
    //   consulta = `SELECT usu_rol, rol_nombre FROM usuario
    //                     INNER JOIN rol ON usuario.usu_rol = rol.rol_id
    //                     WHERE usu_login = '${Usuario}' AND usu_password = '${Pass}'`;
    // }

    const [user]: any = await connectionPool.query(consulta);
    let Menu = [];

    if (user?.length > 0) {
      let key = 100;
      const [Modulos]: any = await connectionPool.query(`
      SELECT mod_nombre as Nombre,ModulosPerfilAcceso.mod_id as Id FROM ModulosPerfilAcceso INNER JOIN NewModulosSygescol ON (NewModulosSygescol.mod_id=ModulosPerfilAcceso.mod_id) where ModulosPerfilAcceso.perfil_id= ${user[0]?.usu_rol}
      `);

      if (Modulos?.length > 0) {
        for (const Module of Modulos) {
          const [SubModulos]: any = await connectionPool.query(
            `select mod_nombre as SubModulo,mod_image as Icon,mod_link as Link ,mod_id as id from NewModulosSygescol where submod_id = ${Module?.Id} and submod_id != 0`
          );

          if (SubModulos?.length > 0) {
            Menu.push({
              key: key++,
              NombreModulo: Module.Nombre,
              SubModulos: SubModulos,
            });
          }
        }
      }
    }

    if ((user as User[]).length > 0) {
      return NextResponse.json(
        { user: user as User[], Menu: Menu || [] },
        {
          status: 209,
        }
      );
    } else {
      return NextResponse.json(
        { body: "Unauthorized" },
        {
          status: 401,
        }
      );
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
