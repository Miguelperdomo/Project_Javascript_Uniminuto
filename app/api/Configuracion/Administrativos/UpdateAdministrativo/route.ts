import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function PUT(req: NextRequest) {
  try {
    const {
      Apellidos,
      Nombre,
      Documento,
      TipoDocumento,
      Cargo,
      Correo,
      Genero,
      Id,
      Usuario,
      Password,
      TipoUsuario,
    } = await req?.json();

    // falta agregar la validacion por sede

    const [UpdateAdministrativo]: any =
      await connectionPool.query(`UPDATE admco 
  SET  nombre = '${Nombre || ""} ${Apellidos || ""}',
  admco_ape1 = '${Apellidos?.split(" ")[0]?.toUpperCase() || ""}', 
  admco_ape2 = '${Apellidos?.split(" ")[1]?.toUpperCase() || ""}', 
  admco_nom1 = '${Nombre?.split(" ")[0]?.toUpperCase() || ""}', 
  admco_nom2 = '${Nombre?.split(" ")[1]?.toUpperCase() || ""}', 
  documento = '${Documento}', 
  tipo_documento = '${TipoDocumento}', 
  cargo = '${Cargo}',
  mail = '${Correo}',
  genero = '${Genero}'
  WHERE id = '${Id}'`);

    const [UpdateUsuario]: any = await connectionPool.query(
      `UPDATE usuario SET rol = '${TipoUsuario || ""}' WHERE idUsuario=${Id}`
    );

    if (
      UpdateAdministrativo?.affectedRows === 0 ||
      UpdateUsuario?.affectedRows === 0
    ) {
      return NextResponse.json(
        { body: "Es posible que no se hayan actualizado todos los Datos." },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { body: "Colaborador actualizado correctamente" },
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
