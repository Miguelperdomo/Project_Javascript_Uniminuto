import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [DocentesRes]: any = await connectionPool.query(`
    SELECT dcne.i as Id, concat(dcne.dcne_nom1,' ',dcne.dcne_nom2) as Nombre, concat(dcne.dcne_ape1,' ',dcne.dcne_ape2) as Apellidos,tipo_docum.codigo as DocumCodigo,tipo_docum.nombre as TipoDocumento,dcne.dcne_num_docu as Documento,dcne_email_perso as Correo,usuario.login as Usuario,usuario.pass as Pass,dcne.dcne_genero as Genero,subSedes.nombre as NombreSubSede,pfc_programa.pro_nom as NombrePrograma,pfc_programa.pro_sigla as Sigla from dcne INNER JOIN usuario on(usuario.idUsuario=dcne.i) INNER JOIN tipo_docum ON (tipo_docum.id=dcne.tipo_docu_id) INNER JOIN subSedes ON subSedes.id=usuario.subsede LEFT JOIN pfc_programa ON dcne.ProgramaId=pfc_programa.pro_id WHERE usuario.rol=2 ${
      SubSede && SubSede != "0" ? `and usuario.subsede = '${SubSede}'` : ""
    } order by dcne_ape1,dcne_ape2,dcne_nom1,dcne_nom2
      `);

    return NextResponse.json(
      { docentes: DocentesRes },
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
