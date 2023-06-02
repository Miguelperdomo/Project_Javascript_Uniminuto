import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const {
      IdSubSede,
      Nombre,
      Apellidos,
      TipoDocumento,
      NumeroDocumento,
      Genero,
      Correo,
      Programa,
    } = await req?.json();

    const [VerificarExistencia]: any = await connectionPool.query(
      `SELECT usuario.id FROM usuario INNER JOIN dcne ON dcne.i=usuario.idUsuario WHERE dcne.dcne_num_docu='${NumeroDocumento}' OR usuario.login LIKE '${
        Nombre?.split(" ")[0]?.replace(/\s+/g, " ").trim()?.toLowerCase() || ""
      }${
        Apellidos?.split(" ")[0]?.replace(/\s+/g, " ").trim()?.toLowerCase() ||
        ""
      }'
        `
    );
    if (VerificarExistencia.length > 0) {
      return NextResponse.json(
        { body: "El Profesor ya existe" },
        {
          status: 400,
        }
      );
    }

    const [ProfesorAdd]: any = await connectionPool.query(`
      INSERT INTO dcne (dcne_ape1, dcne_ape2, dcne_nom1, dcne_nom2, dcne_num_docu, tipo_docu_id,dcne_genero,dcne_email_perso,subSedeId,ProgramaId) values ('${
        Apellidos?.split(" ")[0]?.toUpperCase() || ""
      }', '${Apellidos?.split(" ")[1]?.toUpperCase() || ""}', '${
      Nombre?.split(" ")[0]?.toUpperCase() || ""
    }', '${
      Nombre?.split(" ")[1]?.toUpperCase() || ""
    }','${NumeroDocumento}','${TipoDocumento}','${Genero}','${Correo}','${IdSubSede}','${
      Programa || 0
    }')
      `);

    if (ProfesorAdd.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se puedo agregar el Profesor" },
        {
          status: 400,
        }
      );
    }

    const [AddUser]: any = await connectionPool.query(`
      INSERT INTO usuario (login, pass, rol, tipo, idUsuario,subsede) values ('${
        Nombre?.split(" ")[0]?.replace(/\s+/g, " ").trim()?.toLowerCase() || ""
      }${
      Apellidos?.split(" ")[0]?.replace(/\s+/g, " ").trim()?.toLowerCase() || ""
    }', '${NumeroDocumento}', '2', 'PROFESOR', '${
      ProfesorAdd.insertId
    }','${IdSubSede}')`);

    if (AddUser.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se puedo agregar el usuario del profesor" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        body: "Profesor agregado correctamente",
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
