import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { programa, SemestreAcademico, tipo, SemestreLectivo } =
      await req?.json();

    const [PruebasRes]: any = await connectionPool.query(`
      SELECT pfc_programa.pro_nom as NombrePrograma, parametros_pruebas.DateDocentesInicio InicioDocente,parametros_pruebas.DateDocentesFin as FinDocente,parametros_pruebas.DateEstudiantesInicio as InicioEstudiante, parametros_pruebas.DateEstudiantesFin as FinEstudiantes, subSedes.nombre as NombreSede, parametros_pruebas.id as IdPrueba FROM parametros_pruebas INNER JOIN subSedes ON (subSedes.id=parametros_pruebas.subSedeId) INNER JOIN pfc_programa ON pfc_programa.pro_id=parametros_pruebas.programa WHERE parametros_pruebas.programa='${programa}' AND parametros_pruebas.tipo='${tipo}' ${
      (SemestreAcademico &&
        " AND parametros_pruebas.semestre='" + SemestreAcademico + "'") ||
      ""
    } 
       `);

    return NextResponse.json(
      { pruebas: PruebasRes },
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
