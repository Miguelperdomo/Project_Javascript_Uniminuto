import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    // const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
    //   await req?.json();

    const { Values, ListaModulosSelected } = await req?.json();

    const NombreCapitalize =
      Values?.Nombre?.charAt(0)?.toUpperCase() + Values?.Nombre?.slice(1);

    const [UpdateROl]: any = await connectionPool.query(
      `UPDATE rol SET rol_nombre = '${NombreCapitalize}', roltip_id = ${Values?.Tipo} WHERE rol_id = ${Values?.Id}`
    );

    if (UpdateROl.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo editar" },
        {
          status: 400,
        }
      );
    }

    let BooleanInsert = false;

    let BooleaDelete = false;

    if (Object.keys(ListaModulosSelected)?.length) {
      let sqlBaseAcceso =
        "insert into ModulosPerfilAcceso (perfil_id,mod_id) values ";

      let DeleteBase = "DELETE FROM ModulosPerfilAcceso WHERE acc_id in (";

      for (const ListModulos in ListaModulosSelected) {
        let ModulosAborrar = [];

        const [ModulosAborrarSecon]: any = await connectionPool.query(`
        SELECT acc_id FROM ModulosPerfilAcceso INNER JOIN NewModulosSygescol ON (NewModulosSygescol.mod_id= ModulosPerfilAcceso.mod_id) WHERE NewModulosSygescol.submod_id=${ListModulos} and ModulosPerfilAcceso.perfil_id=${Values.Id} and NewModulosSygescol.submod_id != 0 and ModulosPerfilAcceso.perfil_id != 5 and ModulosPerfilAcceso.perfil_id != 1
        `);

        const [ModulosAborrarPrin]: any = await connectionPool.query(`
        SELECT acc_id FROM ModulosPerfilAcceso INNER JOIN NewModulosSygescol ON (NewModulosSygescol.mod_id= ModulosPerfilAcceso.mod_id) WHERE NewModulosSygescol.mod_id=${ListModulos} and ModulosPerfilAcceso.perfil_id=${Values.Id}  and ModulosPerfilAcceso.perfil_id != 5 and ModulosPerfilAcceso.perfil_id != 1
        `);

        ModulosAborrar = ModulosAborrarSecon.concat(ModulosAborrarPrin);

        if (ModulosAborrar?.length > 0) {
          BooleaDelete = true;
          for (const Modulos of ModulosAborrar) {
            DeleteBase += `${Modulos?.acc_id || ""},`;
          }

          DeleteBase = DeleteBase.slice(0, -1);
        }

        if (ListaModulosSelected[ListModulos]?.length > 0) {
          BooleanInsert = true;

          sqlBaseAcceso += `(${Values?.Id}, ${ListModulos}),`;

          for (const ListSubModulos of ListaModulosSelected[ListModulos]) {
            sqlBaseAcceso += ` (${Values?.Id}, ${ListSubModulos?.value}),`;
          }
        }
      }

      if (BooleaDelete) {
        DeleteBase += ")";

        console.log("DeleteBase", DeleteBase);

        const [DeleteModulos]: any = await connectionPool.query(DeleteBase);
      }

      if (BooleanInsert) {
        sqlBaseAcceso = sqlBaseAcceso.slice(0, -1);

        const [InsertModulos]: any = await connectionPool.query(sqlBaseAcceso);

        if (InsertModulos?.affectedRows === 0) {
          return NextResponse.json(
            { body: "Error al ingresar los módulos" },
            {
              status: 400,
            }
          );
        }
      }
    }

    return NextResponse.json(
      { body: "Se editó correctamente" },
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
