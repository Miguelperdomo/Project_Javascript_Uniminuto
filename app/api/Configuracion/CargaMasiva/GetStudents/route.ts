import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const SubSede = searchParams.get("SubSede");

  try {
    const [AlumnosRes]: any = await connectionPool.query(
      `select pfc_alumno.alumno_num_docu as Documento,concat (pfc_alumno.alumno_nom1,' ',pfc_alumno.alumno_nom2) as Nombre,concat (pfc_alumno.alumno_ape1,' ',pfc_alumno.alumno_ape2) as Apellidos,pfc_alumno.alumno_email as Correo,pfc_alumno.alumno_celular as Celular,pfc_alumno.alumno_genero as Genero,pfc_alumno.alumno_rum as RUM,pfc_alumno.alumno_id as Id, usuario.pass as Pass, usuario.login as Usuario, pfc_alumno.tipo_docu_id as TipoDocumento, subSedes.nombre as NombreSubSede,pfc_programa.pro_nom as NombrePrograma from pfc_alumno LEFT JOIN usuario ON (pfc_alumno.alumno_id=usuario.idUsuario) INNER JOIN subSedes ON subSedes.id=usuario.subsede LEFT JOIN pfc_matricula ON pfc_matricula.alumno_id=pfc_alumno.alumno_id LEFT JOIN pfc_programa ON pfc_matricula.programa=pfc_programa.pro_id WHERE usuario.rol=3 ${
        SubSede && SubSede != "0" ? `and usuario.subsede = '${SubSede}'` : ""
      }`
    );

    return NextResponse.json(
      { estudiantes: AlumnosRes || [] },
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
