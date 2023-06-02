import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {
    const SubSede = searchParams?.get("SubSede");
    const [AdministrativosRes]: any = await connectionPool.query(
      `select admco.id as Id,concat(admco.admco_nom1,' ',admco.admco_nom2) as Nombre,concat(admco.admco_ape1,' ',admco.admco_ape2) as Apellidos,admco.documento as Documento, admco.cargo as Cargo,admco.mail as Correo,admco.imagen as Imagen,usuario.login Usuario, usuario.pass as Pass,admco.tipo_documento as TipoDocumento,genero as Genero, usuario.rol as TipoUsuario,subSedes.nombre as NombreSubSede from admco INNER JOIN usuario ON(admco.id=usuario.idUsuario)  INNER JOIN subSedes ON subSedes.id=usuario.subsede WHERE usuario.tipo LIKE  'ADMINISTRATIVO' ${
        SubSede && SubSede != "0" ? `and usuario.subsede = '${SubSede}' ` : ""
      }
        `
    );
    return NextResponse.json(
      { administrativos: AdministrativosRes || [] },
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
