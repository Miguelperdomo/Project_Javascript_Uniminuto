import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const SubSede = searchParams.get("SubSede") || "";
  const IdRol = searchParams.get("IdRol") || "";
  const IdUser = searchParams.get("IdUser") || "";
  const Doc = searchParams.get("Doc") || "";
  const PruebaID = searchParams.get("PruebaID") || "";

  try {
    if (IdRol == "3") {
      const [InfoMatriculaEstudiante]: any = await connectionPool.query(
        `SELECT programa,semestre,matri_id FROM pfc_matricula WHERE alumno_id='${IdUser}' and subSedeId='${SubSede}'`
      );

      if (InfoMatriculaEstudiante?.length == 1) {
        const { programa, semestre, matri_id } = InfoMatriculaEstudiante[0];

        const [PruebasResult]: any = await connectionPool.query(
          `SELECT parametros_pruebas.tipo,parametros_pruebas.DateEstudiantesInicio,parametros_pruebas.DateEstudiantesFin, pfc_programa.pro_nom as NombrePrograma,parametros_pruebas.id as IdPrueba FROM parametros_pruebas INNER JOIN pfc_programa ON pfc_programa.pro_id=parametros_pruebas.programa WHERE parametros_pruebas.id NOT IN(SELECT respuestas_estudiante.prueba FROM respuestas_estudiante WHERE respuestas_estudiante.estudiante = '${matri_id}' ) and parametros_pruebas.programa='${programa}' and parametros_pruebas.semestre='${semestre}' and parametros_pruebas.subSedeId='${SubSede}'`
        );

        if (PruebasResult.length == 0) {
          return NextResponse.json(
            { pruebas: [] },
            {
              status: 200,
            }
          );
        }

        for (const pruebas of PruebasResult) {
        }

        const Pruebas: [] = PruebasResult?.filter((prueba: any) => {
          const {
            tipo,
            NombrePrograma,
            Semestre,
            IdPrueba,
            DateEstudiantesInicio,
            DateEstudiantesFin,
          } = prueba;

          // convert DateDocentesInicios a milisigundos para comparar
          const DateEstudiantesInicioMilisegundos = new Date(
            DateEstudiantesInicio
          ).getTime();
          const DateEstudiantesFinMilisegundos = new Date(
            DateEstudiantesFin
          ).getTime();

          // convertir fecha actual a milisegundos
          const DateNowMilisegundos = new Date().getTime();

          // comparar fechas

          const isDateEstudiantesInicio =
            DateNowMilisegundos >= DateEstudiantesInicioMilisegundos;
          const isDateEstudiantesFin =
            DateNowMilisegundos <= DateEstudiantesFinMilisegundos;

          const isEstudiantesDocentes =
            isDateEstudiantesInicio && isDateEstudiantesFin;

          if (isEstudiantesDocentes) {
            return {
              prueba,
            };
          }
        });

        return NextResponse.json(
          { pruebas: Pruebas || [] },
          {
            status: 200,
          }
        );
      }
    } else {
      return NextResponse.json(
        { pruebas: [] },
        {
          status: 200,
        }
      );
    }
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
