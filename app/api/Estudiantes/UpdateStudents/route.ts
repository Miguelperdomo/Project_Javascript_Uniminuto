import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function PUT(req: NextRequest) {
  try {
    const {
      Password,
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
      Id,
    } = await req?.json();

    console.log(`
    UPDATE pfc_alumno SET tipo_docu_id='${TipoDocumento}', alumno_num_docu='${NumeroDocumento}', alumno_ape1='${Apellidos?.split(
      " "
    )[0]?.toUpperCase()}', alumno_ape2='${
      Apellidos?.split(" ")[1]?.toUpperCase() || ""
    }', alumno_nom1='${Nombre?.split(" ")[0]?.toUpperCase()}', alumno_nom2='${
      Nombre?.split(" ")[1]?.toUpperCase() || ""
    }', alumno_celular='${Telefono}', alumno_email='${Email}' WHERE alumno_id='${Id}'
    `);

    const [UpdateAlumno]: any = await connectionPool.query(`
      UPDATE pfc_alumno SET tipo_docu_id='${TipoDocumento}', alumno_num_docu='${NumeroDocumento}', alumno_ape1='${Apellidos?.split(
      " "
    )[0]?.toUpperCase()}', alumno_ape2='${
      Apellidos?.split(" ")[1]?.toUpperCase() || ""
    }', alumno_nom1='${Nombre?.split(" ")[0]?.toUpperCase()}', alumno_nom2='${
      Nombre?.split(" ")[1]?.toUpperCase() || ""
    }', alumno_celular='${Telefono}', alumno_email='${Email}' WHERE alumno_id='${Id}'
      `);

    if (UpdateAlumno?.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo actualizar el estudiante" },
        {
          status: 400,
        }
      );
    }

    const [UpdateMatricula]: any = await connectionPool.query(`
      UPDATE pfc_matricula SET GrupoMatriculadoId='${GrupoDestino}', subSedeId='${IdSubSede}', programa='${Programa}', semestre='${Semestre}' WHERE alumno_id='${Id}'
      `);

    if (UpdateMatricula?.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se pudo actualizar la matricula" },
        {
          status: 400,
        }
      );
    }

    const [Matricula]: any = await connectionPool.query(`
      SELECT matri_id as IdMatricula FROM pfc_matricula WHERE alumno_id=1
      `);

    const [UpdateUsuario]: any = await connectionPool.query(
      `UPDATE usuario SET pass='${Password}', subsede='${IdSubSede}' WHERE idUsuario='${Id}' and rol=3`
    );
    if (UpdateUsuario?.affectedRows === 0) {
      return NextResponse.json(
        { body: "las credenciales del usuario" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { body: "Estudiante actualizado correctamente" },
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
