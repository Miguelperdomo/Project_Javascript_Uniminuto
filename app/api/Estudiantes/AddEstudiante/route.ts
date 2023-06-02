import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function POST(req: NextRequest) {
  try {
    const {
      Nombre,
      Apellidos,
      Email,
      Telefono,
      TipoDocumento,
      NumeroDocumento,
      Programa,
      Semestre,
      IdSubSede,
      GrupoDestino,
    } = await req?.json();

    const [ExistenciaAlumno]: any = await connectionPool.query(`
        SELECT alumno_num_docu FROM pfc_alumno WHERE alumno_num_docu = '${NumeroDocumento}'
    `);
    if (ExistenciaAlumno?.length > 0) {
      return NextResponse.json(
        { body: "El estudiante ya se encuentra en el sistema " },
        {
          status: 400,
        }
      );
    }

    const year = new Date().getFullYear();

    let Lectivo: string = "";
    const month = new Date().getMonth() + 1;
    if (month >= 6) {
      Lectivo = "B";
    } else {
      Lectivo = "A";
    }

    const [MaxIdAlumno]: any = await connectionPool.query(`
   SELECT MAX(alumno_id) AS MaxIdAlumno FROM pfc_alumno`);

    console.log(`
   INSERT INTO pfc_alumno (alumno_rum, tipo_docu_id, alumno_num_docu, alumno_ape1, alumno_ape2, alumno_nom1,alumno_nom2, alumno_celular, alumno_email) values  ('${
     MaxIdAlumno[0].MaxIdAlumno + 1
   }', '${TipoDocumento}', '${NumeroDocumento}', '${Apellidos?.split(
      " "
    )[0]?.toUpperCase()}', '${
      Apellidos?.split(" ")[1]?.toUpperCase() || ""
    }', '${Nombre?.split(" ")[0]?.toUpperCase()}', '${
      Nombre?.split(" ")[1]?.toUpperCase() || ""
    }', '${Telefono}', '${Email}')`);

    const [InsertAlumno]: any = await connectionPool.query(`
   INSERT INTO pfc_alumno (alumno_rum, tipo_docu_id, alumno_num_docu, alumno_ape1, alumno_ape2, alumno_nom1,alumno_nom2, alumno_celular, alumno_email) values  ('${
     MaxIdAlumno[0].MaxIdAlumno + 1
   }', '${TipoDocumento}', '${NumeroDocumento}', '${Apellidos?.split(
      " "
    )[0]?.toUpperCase()}', '${
      Apellidos?.split(" ")[1]?.toUpperCase() || ""
    }', '${Nombre?.split(" ")[0]?.toUpperCase()}', '${
      Nombre?.split(" ")[1]?.toUpperCase() || ""
    }', '${Telefono}', '${Email}')`);

    if (!InsertAlumno?.insertId) {
      return NextResponse.json(
        { body: "Error al ingresar el estudiante" },
        {
          status: 400,
        }
      );
    }

    const [InsertMatricula]: any = await connectionPool.query(`
 INSERT INTO pfc_matricula (alumno_id, matri_anyo ,matri_fecha,programa, semestre, semes_lectivo, matri_nuevo, matri_estado,subSedeId,GrupoMatriculadoId) values  ('${InsertAlumno?.insertId}','${year}','CURDATE()','${Programa}','${Semestre}','${Lectivo}','N','0','${IdSubSede}','${GrupoDestino}')`);

    if (!InsertMatricula?.insertId) {
      return NextResponse.json(
        { body: "Error al ingresar la matrícula" },
        {
          status: 400,
        }
      );
    }

    const [InsertUsuario]: any = await connectionPool.query(`
 INSERT INTO usuario (login, pass, rol, tipo, idUsuario,subsede) values  ('${NumeroDocumento}','${NumeroDocumento}','3','ESTUDIANTE','${InsertAlumno?.insertId}','${IdSubSede}')`);

    if (!InsertUsuario?.insertId) {
      return NextResponse.json(
        { body: "Error al ingresar el usuario" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { body: "Estudiante Agregado con éxito" },
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
