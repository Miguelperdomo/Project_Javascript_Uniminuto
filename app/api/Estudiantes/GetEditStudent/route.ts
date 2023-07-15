import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function POST(req: NextRequest) {
  try {
    const { IdEstudiante } = await req?.json();

    // falta agregar la validacion por sede
    const [InfoEstudianteRes]: any = await connectionPool.query(
      `SELECT pfc_programa.pro_nom as Programa, pfc_matricula.semestre as Semestre,pfc_programa.pro_id as ProgramaId,pfc_matricula.GrupoMatriculadoId, pfc_grupos.pfc_grupo_id as GrupoId, pfc_grupos.pfc_grupo_nom as NombreGrupo FROM pfc_matricula INNER JOIN pfc_programa ON (pfc_programa.pro_id=pfc_matricula.programa) INNER JOIN pfc_grupos ON pfc_grupos.pfc_grupo_id=pfc_matricula.GrupoMatriculadoId WHERE alumno_id=${IdEstudiante}`
    );

    const DataRes = {
      Programa: InfoEstudianteRes[0]?.Programa,
      Semestre: InfoEstudianteRes[0]?.Semestre,
      Grupo: InfoEstudianteRes[0]?.NombreGrupo,
      GrupoId: InfoEstudianteRes[0]?.GrupoId,
      ProgramaId: InfoEstudianteRes[0]?.ProgramaId,
    };

    return NextResponse.json(
      { DemasInfo: DataRes || {} },
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
