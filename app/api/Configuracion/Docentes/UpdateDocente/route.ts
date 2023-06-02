import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    const {
      Nombre,
      Apellidos,
      Documento,
      Correo,
      TipoDocumento,
      IdDocente,
      Genero,
    } = await req?.json();

    let nombre1 = Nombre?.split(" ")[0]?.toUpperCase() || "";
    let nombre2 = Nombre?.split(" ")[1]?.toUpperCase() || "";
    let apellido1 = Apellidos?.split(" ")[0]?.toUpperCase() || "";
    let apellido2 = Apellidos?.split(" ")[1]?.toUpperCase() || "";

    const [UpdateDocente]: any = await connectionPool.query(
      `update dcne set dcne_ape1='${apellido1}',dcne_ape2='${
        apellido2 || ""
      }',dcne_nom1='${nombre1}', dcne_nom2='${nombre2}',dcne_email_perso='${Correo}',tipo_docu_id='${TipoDocumento}',dcne_num_docu='${Documento}',dcne_genero='${Genero}'  where i=${IdDocente}`
    );

    if (UpdateDocente?.affectedRows === 0) {
      return NextResponse.json(
        { body: "Profesor no encontrado" },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      { body: "Profesor actualizado con éxito" },
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
