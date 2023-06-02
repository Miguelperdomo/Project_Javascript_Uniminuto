import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    // const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
    //   await req?.json();

    const {
      Rol,
      IdUser,
      Nombre,
      Apellidos,
      Correo,
      Documento,
      Usuario,
      Pass,
      Celular,
      TipoDocumento,
    } = await req?.json();

    const [getTipo]: any = await connectionPool.query(`
    SELECT tipo FROM usuario WHERE idUsuario = ${IdUser} and rol='${Rol}'`);

    if (getTipo[0]?.tipo == "ADMINISTRATIVO") {
      const [updateAdmin]: any = await connectionPool.query(`
        UPDATE admco SET admco_ape1 = '${
          Apellidos?.split(" ")[0] || ""
        }',admco_ape2 = '${Apellidos?.split(" ")[1] || ""}', admco_nom1 = '${
        Nombre?.split(" ")[0] || ""
      }',admco_nom2 = '${
        Nombre?.split(" ")[1] || ""
      }',admco_celular='${Celular}',tipo_documento='${TipoDocumento}', mail = '${Correo}', documento = '${Documento}' WHERE id = ${IdUser}`);

      if (updateAdmin.affectedRows === 0) {
        return NextResponse.json(
          { body: "No se pudo editar la información personal" },
          {
            status: 400,
          }
        );
      }
    }

    if (getTipo[0]?.tipo == "ESTUDIANTE") {
      const [updateStudent]: any = await connectionPool.query(`
        UPDATE pfc_alumno SET alumno_ape1 = '${
          Apellidos?.split(" ")[0]?.toUpperCase() || ""
        }',alumno_ape2 = '${
        Apellidos?.split(" ")[1]?.toUpperCase() || ""
      }', alumno_nom1 = '${
        Nombre?.split(" ")[0]?.toUpperCase() || ""
      }',alumno_nom2 = '${
        Nombre?.split(" ")[1]?.toUpperCase() || ""
      }',alumno_celular='${Celular}',tipo_docu_id='${TipoDocumento}', alumno_email = '${Correo}', alumno_num_docu = '${Documento}' WHERE alumno_id = ${IdUser}`);

      if (updateStudent?.affectedRows === 0) {
        return NextResponse.json(
          { body: "No se pudo editar la información personal" },
          {
            status: 400,
          }
        );
      }
    }

    if (getTipo[0]?.tipo == "PROFESOR") {
      const [updateTeacher]: any = await connectionPool.query(`
      UPDATE dcne SET dcne_ape1 = '${
        Apellidos?.split(" ")[0]?.toUpperCase() || ""
      }',dcne_ape2 = '${
        Apellidos?.split(" ")[1]?.toUpperCase() || ""
      }', dcne_nom1 = '${
        Nombre?.split(" ")[0]?.toUpperCase() || ""
      }',dcne_nom2 = '${
        Nombre?.split(" ")[1]?.toUpperCase() || ""
      }',dcne_email_perso='${Correo}',dcne_num_docu='${Documento}',dcne_celular='${Celular}',tipo_docu_id='${TipoDocumento}' WHERE i = ${IdUser}
      `);

      if (updateTeacher?.affectedRows === 0) {
        return NextResponse.json(
          { body: "No se pudo editar la información personal" },
          {
            status: 400,
          }
        );
      }
    }

    const [UpdateUser]: any = await connectionPool.query(`
    UPDATE usuario SET login = '${Usuario}', pass = '${Pass}' WHERE idUsuario = ${IdUser} and rol='${Rol}'`);

    if (UpdateUser?.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo editar el usuario" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        body: "Se editó correctamente. por favor, vuelva a ingresar a la aplicación",
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
