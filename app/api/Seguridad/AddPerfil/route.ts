import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const {
      Values: { Nombre, Rol },
      ListaModulosSelected,
    } = await req?.json();
    // verificar si el rol existe
    const [RolExist]: any = await connectionPool.query(`
 SELECT rol_nombre FROM rol WHERE rol_nombre LIKE '${Nombre.toUpperCase()}'
 `);

    if (RolExist.length > 0) {
      return NextResponse.json(
        { body: "El rol ya existe" },
        {
          status: 400,
        }
      );
    }

    const [GetRol]: any = await connectionPool.query(
      `insert into rol (rol_nombre, roltip_id) values ('${Nombre?.toUpperCase()}', ${Rol})`
    );
    if (GetRol?.affectedRows == 0) {
      return NextResponse.json(
        { body: "Error al ejecutar la consulta" },
        {
          status: 400,
        }
      );
    }

    let sqlBaseAcceso =
      "insert into ModulosPerfilAcceso (perfil_id,mod_id) values ";

    for (const ListModulos in ListaModulosSelected) {
      sqlBaseAcceso += `  (${GetRol?.insertId}, ${ListModulos}),`;

      if (ListaModulosSelected[ListModulos].length > 0) {
        for (const ListSubModulos of ListaModulosSelected[ListModulos]) {
          sqlBaseAcceso += ` (${GetRol?.insertId}, ${ListSubModulos?.value}),`;
        }
      }
    }

    sqlBaseAcceso = sqlBaseAcceso.slice(0, -1);

    const [AddAccesos]: any = await connectionPool.query(sqlBaseAcceso);

    return NextResponse.json(
      {
        body: "Rol agregado correctamente",
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
