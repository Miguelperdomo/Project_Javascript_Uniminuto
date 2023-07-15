import { NextResponse } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: any) {
  const { searchParams } = req?.nextUrl;
  console.log("searchParams", searchParams);

  try {
    let num = searchParams?.get("num");

    const [ConfigSygescol]: any = await connectionPool.query(`
              SELECT conf_valor FROM conf_sygescol WHERE conf_id = 143`);
    const [selectCupo]: any = await connectionPool.query(
      `SELECT * FROM cupos_acceso WHERE cupo_num_docu = ${num}`
    );
    const [neeFisica]: any = await connectionPool.query(`
              SELECT * FROM nee where id_tipo_nee = 1
                `);
    const [neeSensorial]: any = await connectionPool.query(`
               SELECT * FROM nee where id_tipo_nee = 2
                `);
    const [neePsiquica]: any = await connectionPool.query(`
                SELECT * FROM nee where id_tipo_nee = 3
                `);
    const [neeCognitiva]: any = await connectionPool.query(`
                 SELECT * FROM nee where id_tipo_nee = 4
                `);
    const [neeTalentos]: any = await connectionPool.query(`
                  SELECT * FROM nee where id_tipo_nee = 5
                `);
    const [SeccionFormSave]: any = await connectionPool.query(`
                SELECT * FROM guardar_seccion_formulario WHERE alumno_num_docu = '${selectCupo[0]?.cupo_num_docu}' AND seccion_guardada LIKE 'N.E.E'
                 `);

    return NextResponse.json(
      {
        ConfigSygescol,
        selectCupo,
        neeFisica,
        neeSensorial,
        neePsiquica,
        neeCognitiva,
        neeTalentos,
        SeccionFormSave,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    NextResponse.json({ body: "error" }, { status: 400 });
  }
}

// ---------------------------------- Estacio para la Peticion PUT

export async function PUT(req: any) {
  try {
    const { searchParams } = req?.nextUrl;

    // Se obtienen los parámetros de la URL
    let num = searchParams.get("num");
    let Documento = searchParams.get("Documento");

    // Se construye la consulta SQL para actualizar los datos del usuario
    const [guarda]: any = await connectionPool.query(`
      SELECT * FROM guardar_seccion_formulario WHERE alumno_num_docu = '${Documento}' AND seccion_guardada LIKE 'N.E.E'
       `);
    if (!guarda.length) {
      const [GuardarSeccionFormulario] = await connectionPool.query(`
        INSERT INTO guardar_seccion_formulario (alumno_num_docu, guardado, seccion_guardada) VALUES ('${Documento}','1','N.E.E')
        `);
    }

    // Se verifica si se actualizaron correctamente los datos del usuario
    // Si se actualizaron los datos del usuario, se envía una respuesta exitosa
    return NextResponse.json(
      {
        num,
        Documento,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    // En caso de error, se envía una respuesta con código 500
    NextResponse.json({ body: "Internal server error" }, { status: 500 });
  }
}
