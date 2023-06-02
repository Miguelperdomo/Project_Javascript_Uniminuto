// Se importa la función NextResponse de Next.js, así como el pool de conexiones a la base de datos y el tipo de usuario.
import { log } from "console";
import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

// Función GET asincrónica que recibe un objeto 'req' como parámetro.
export async function GET(req: any) {
  try {
    // Se extraen los parámetros de búsqueda de la URL.
    const { searchParams } = req?.nextUrl;
    console.log("searchParams", searchParams);

    // Se obtienen los valores de los parámetros de búsqueda.
    let Documento = searchParams?.get("Documento");
    let Rol = searchParams?.get("IdRol");
    let IdUser = searchParams?.get("IdUser");
    let Value = searchParams?.get("Value");

    // Se construye la consulta SQL que se ejecutará en la base de datos para obtener la información del usuario.
    let consulta = `SELECT pfc_matricula.matri_anyo as MatriYear,subSedes.nombre as NombreCoa,pfc_programa.pro_nom as NombrePrograma, pfc_alumno.alumno_id,pfc_alumno.BeneficiarioFliaAccion,pfc_alumno.CodFliaAccion,pfc_alumno.CodBeneficiarioFliaAccion,pfc_alumno.RUV, pfc_alumno.CodRuv,pfc_alumno.CodBeneficiarioRuv FROM pfc_matricula INNER JOIN subSedes ON pfc_matricula.subSedeId=subSedes.id INNER JOIN pfc_programa ON pfc_matricula.programa=pfc_programa.pro_id INNER JOIN pfc_alumno ON pfc_matricula.alumno_id=pfc_alumno.alumno_id WHERE pfc_alumno.alumno_num_docu='${Documento}' AND pfc_alumno.alumno_id='${IdUser}'`;

    // Se ejecuta la consulta en la base de datos y se guarda el resultado en la variable 'user'.
    const [user]: any = await connectionPool.query(consulta);

    // Se imprime en la consola el resultado de la consulta.
    console.log(consulta);

    // Si se encontró un usuario con los parámetros de búsqueda, se devuelve una respuesta HTTP 200 con los datos del usuario en formato JSON.

    return NextResponse.json({ InfoDatos: user[0] }, { status: 200 });

    // De lo contrario, si no se encontró un usuario con los parámetros de búsqueda, se devuelve una respuesta HTTP 400 con el mensaje 'error' en formato JSON.
  } catch (error) {
    // En caso de que ocurra un error en la ejecución de la consulta, se devuelve una respuesta HTTP 400 con el mensaje 'error' en formato JSON.
    console.log(error);

    NextResponse.json(
      { body: "error" },
      {
        status: 400,
      }
    );
  }
}

// -------------------------------- Espacio para la peticion PUT

export async function PUT(req: any) {
  try {
    const { Value, Documento, Rol, IdUser } = await req?.json();

    const [UpdateAlumno]: any = await connectionPool.query(
      `UPDATE pfc_alumno SET 	BeneficiarioFliaAccion='${
        Value?.FliaAccion || ""
      }',CodFliaAccion='${
        Value?.CodigoFliaAccion || ""
      }',CodBeneficiarioFliaAccion='${
        Value.InputCodigoFliaBeneficiario || ""
      }',RUV	='${Value.RUV || ""}',CodRuv='${
        Value.InputCodigRUV || ""
      }',CodBeneficiarioRuv	='${
        Value?.InputCodigBeneficiarioRUV || ""
      }' where alumno_id='${IdUser}' and alumno_num_docu='${Documento}'`
    );

    if (UpdateAlumno.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se encontró el usuario" },
        {
          status: 404,
        }
      );
    }

    const [CheckSectionSave]: any = await connectionPool.query(
      `SELECT * FROM guardar_seccion_formulario WHERE alumno_num_docu='${Documento}' `
    );
    console.log("CheckSectionSave", CheckSectionSave);

    if (!CheckSectionSave?.length) {
      const [InsertSectionSave]: any = await connectionPool.query(
        `INSERT INTO guardar_seccion_formulario (alumno_num_docu, guardado,seccion_guardada) VALUES ('${Documento}', 1,'DatosAcademicos')`
      );
    }
    // const [UpdateSectionSave]: any = await connectionPool.query(``)

    // res.status(200).json({ body: "Información Cargada Con Exitó" });
    return NextResponse.json(
      { body: "Información Cargada Con Exitó" },
      {
        status: 200,
      }
    );
  } catch (error) {
    // En caso de error, se envía una respuesta con código 500
    return NextResponse.json(
      { body: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
