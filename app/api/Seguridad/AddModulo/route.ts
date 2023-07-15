import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
      await req?.json();

    if (TipoModulo === 1) {
      const [ModuloExistente]: any = await connectionPool.query(`
        SELECT mod_id as Id,mod_nombre as Nombre FROM NewModulosSygescol WHERE mod_nombre = '${Nombre?.toUpperCase()}'
      `);

      if (ModuloExistente?.length > 0) {
        return NextResponse.json(
          { body: "Modulo Existente" },
          {
            status: 200,
          }
        );
      }
      const [InsertPrincipal]: any = await connectionPool.query(
        `INSERT INTO NewModulosSygescol (submod_id, mod_nombre, mod_link) VALUES (0,'${Nombre?.toUpperCase()}','/')`
      );

      const [InsertSoporte]: any = await connectionPool.query(
        `insert into ModulosPerfilAcceso (perfil_id,mod_id) values ('1','${InsertPrincipal?.insertId}'),('5','${InsertPrincipal?.insertId}') `
      );
      if (InsertPrincipal.affectedRows > 0) {
        return NextResponse.json(
          { body: "Módulo Principal Creado" },
          {
            status: 200,
          }
        );
      }
    }

    if (TipoModulo === 2) {
      const [SubModuloExistente]: any = await connectionPool.query(`
        SELECT mod_id as Id,mod_nombre as Nombre FROM NewModulosSygescol WHERE mod_nombre = '${Nombre?.toUpperCase()}' and submod_id != 0
      `);

      if (SubModuloExistente?.length > 0) {
        return NextResponse.json(
          { body: "SubMódulo ya existente " },
          {
            status: 200,
          }
        );
      }

      const [OrderModulo]: any = await connectionPool.query(
        `select max(mod_posicion) as maximo from NewModulosSygescol where submod_id = '${ModuloPrincipal}' and submod_id != 0
          `
      );

      let ModulosRuta = NombreModuloPrincipal?.split(" ")
        .map((word: any) => {
          return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
        })
        .join("");

      const ModuloPrincipalName = Nombre?.split(" ")
        .map((word: any) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join("");

      const [InsertSubModulo]: any = await connectionPool.query(
        `INSERT INTO NewModulosSygescol (submod_id, mod_nombre, mod_link,mod_posicion) VALUES (${ModuloPrincipal},'${Nombre?.toUpperCase()}','${ModulosRuta.normalize(
          "NFD"
        ).replace(/[\u0300-\u036f]/g, "")}/${ModuloPrincipalName.normalize(
          "NFD"
        ).replace(/[\u0300-\u036f]/g, "")}','${
          OrderModulo[0].maximo + 1 || 1
        }')`
      );

      const [InsertSoporte]: any = await connectionPool.query(
        `insert into ModulosPerfilAcceso (perfil_id,mod_id) values ('1','${InsertSubModulo?.insertId}'),('5','${InsertSubModulo?.insertId}') `
      );

      if (InsertSubModulo?.affectedRows > 0) {
        return NextResponse.json(
          { body: "SubMódulo Creado" },
          {
            status: 200,
          }
        );
      }
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
