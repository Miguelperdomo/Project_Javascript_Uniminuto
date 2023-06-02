import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const {
      Password,
      Nombre,
      Apellidos,
      TipoDocumento,
      NumeroDocumento,
      Cargo,
      Perfil,
      Correo,
      Genero,
      IdSubSede,
    } = await req?.json();

    // falta agregar la validacion por sede

    const [VerificarExistencia]: any = await connectionPool.query(
      `SELECT * FROM usuario WHERE login = '${
        Nombre?.split(" ")[0]
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") || ""
      }${
        Apellidos?.split(" ")[0]
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") || ""
      }' and tipo = 'ADMINISTRATIVO'`
    );
    if (VerificarExistencia.length > 0) {
      return NextResponse.json(
        { body: "El colaborador ya existe" },
        {
          status: 400,
        }
      );
    }

    const [AdministrativoAdd]: any = await connectionPool.query(`
      INSERT INTO admco (nombre, admco_ape1, admco_ape2, admco_nom1, admco_nom2, documento, tipo_documento, cargo,mail,genero,subSedeId) values ('${Apellidos} ${Nombre}', '${
      Apellidos?.split(" ")[0]?.toUpperCase() || ""
    }', '${Apellidos?.split(" ")[1]?.toUpperCase() || ""}', '${
      Nombre?.split(" ")[0]?.toUpperCase() || ""
    }', '${
      Nombre?.split(" ")[1]?.toUpperCase() || ""
    }', '${NumeroDocumento}', '${TipoDocumento}', '${Cargo.toUpperCase()}','${Correo}','${Genero}','${IdSubSede}')
      `);

    if (AdministrativoAdd.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se puedo agregar el colaborador" },
        {
          status: 400,
        }
      );
    }

    const [AddUser]: any = await connectionPool.query(`
      INSERT INTO usuario (login, pass, rol, tipo, idUsuario,subsede) values ('${
        Nombre?.split(" ")[0]
          ?.toLowerCase()
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") || ""
      }${
      Apellidos?.split(" ")[0]
        ?.toLowerCase()
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") || ""
    }', '${NumeroDocumento}', '${Perfil || ""}', 'ADMINISTRATIVO', '${
      AdministrativoAdd.insertId
    }','${IdSubSede}')`);

    if (AddUser.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se puedo agregar el usuario" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { body: "Colaborador agregado correctamente" },
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
