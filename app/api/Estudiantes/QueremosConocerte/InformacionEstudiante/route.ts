// Se importa la función NextResponse de Next.js, así como el pool de conexiones a la base de datos y el tipo de usuario.
import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

// Función GET asincrónica que recibe un objeto 'req' como parámetro.
export async function GET(req: any) {
  try {
    // Se extraen los parámetros de búsqueda de la URL.
    const { searchParams } = req?.nextUrl;
    console.log("searchParams", searchParams);

    // Se obtienen los valores de los parámetros de búsqueda.
    let num = searchParams?.get("num");

    // Se construye la consulta SQL que se ejecutará en la base de datos para obtener la información del usuario.
    const [Departamentos]: any = await connectionPool.query(`
    SELECT * FROM dpto ORDER BY nombre ASC
    `);

    const [Municipios]: any = await connectionPool.query(`
    SELECT * FROM municipio ORDER BY municipio_nombre ASC
    `);
    const [GrupoSanguineo]: any = await connectionPool.query(`
    SELECT gruposang.id, gruposang.nombre FROM gruposang ORDER BY gruposang.nombre
    `);
    const [Eps]: any = await connectionPool.query(`
    SELECT eps.id, eps.nombre FROM eps ORDER BY eps.nombre
    `);
    const [Ars]: any = await connectionPool.query(`
    SELECT ars.id, ars.nombre FROM ars ORDER BY ars.nombre
    `);
    const [Genero]: any = await connectionPool.query(`
    SELECT * FROM genero
  
    `);

    const [DataSave]: any = await connectionPool.query(`
    SELECT CONCAT(alumno_nom1,' ',alumno_nom2,' ',alumno_ape1,' ',alumno_ape2) AS Nombre,muni_nac_id,muni_exp_id,exp_otro_pais,alumno_fec_nac,alumno_fec_exp,otro_pais_nac,alumno_genero,rh_id,alumno_estatura,alumno_peso,sisben_id,sin_sisben,sisben_mun_exp_id,eps_id,alumno_hmcf,tipo_docu_id FROM pfc_alumno where alumno_num_docu = ${num}
    `);

    const [TiposDocumento]: any = await connectionPool.query(`
    SELECT tipo_docum.id, tipo_docum.codigo, SUBSTR(tipo_docum.nombre,1,30) nombre FROM tipo_docum WHERE id = ${DataSave[0]?.tipo_docu_id}
    `);

    // Si se encontró un usuario con los parámetros de búsqueda, se devuelve una respuesta HTTP 200 con los datos del usuario en formato JSON.
    return NextResponse.json(
      {
        Departamentos,
        Municipios: Municipios || {},
        GrupoSanguineo,
        Eps,
        Ars,
        Genero,
        TiposDocumento: TiposDocumento[0] || {},
        DataSave: DataSave[0] || {},
      },
      { status: 200 }
    );
  } catch (error) {
    // En caso de que ocurra un error en la ejecución de la consulta, se devuelve una respuesta HTTP 400 con el mensaje 'error' en formato JSON.
    console.log(error);

    NextResponse.json({ body: "error" }, { status: 400 });
  }
}

// ---------------------------------- Estacio para la Peticion PUT

export async function PUT(req: any) {
  try {
    const { num, data }: any = await req?.json();

    // Se construye la consulta SQL para actualizar los datos del usuario
    const [envio] = await connectionPool.query(
      `UPDATE inscripciones SET depa_exp_id = '${
        data?.MunExpedicion?.departamento_id || ""
      }', muni_exp_id = '${
        data?.MunExpedicion?.municipio_id || ""
      }', exp_otro_pais = '${data.OtroPais}' ,alumno_fec_nac = '${
        data?.DateNacimiento?.substring(0, 10) || ""
      }', alumno_fec_exp = '${
        data?.DateExpedicion?.substring(0, 10) || ""
      }', muni_nac_id = '${
        data?.MunNacimiento?.municipio_id || ""
      }', otro_pais_nac = '${
        data?.OtroPais || ""
      }', est_nac = '' ,alumno_genero = '${data?.Genero?.id || ""}', rh_id = '${
        data?.Rh?.id || ""
      }', sisben_id = '${data?.SisbenPuntaje || ""}',sin_sisben = '${
        data?.SisbenPuntaje ? "1" : "0"
      }', sisben_mun_exp_id = '${
        data?.MunicipioExpSisben?.municipio_id || ""
      }' ,eps_id = '${data?.Eps?.id || ""}', alumno_hmcf = '${
        data?.HijoMadreCabeza || ""
      }' WHERE alumno_num_docu = ${num}`
    );
    const [guarda]: any = await connectionPool.query(`
              SELECT id FROM guardar_seccion_formulario WHERE alumno_num_docu = '${num}' AND seccion_guardada = 'INFORMACION DEL ESTUDIANTE'
              `);
    if (!guarda.length) {
      const [ingresa] = await connectionPool.query(
        `INSERT INTO guardar_seccion_formulario(alumno_num_docu,guardado,seccion_guardada) VALUES('${num}',1,'INFORMACION DEL ESTUDIANTE')`
      );
    }

    // Se verifica si se actualizaron correctamente los datos del usuario
    // Si se actualizaron los datos del usuario, se envía una respuesta exitosa
    return NextResponse.json(
      {
        num,
        data,
        envio,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    // En caso de error, se envía una respuesta con código 500
    NextResponse.json({ body: "Internal server error" }, { status: 500 });
  }
}
