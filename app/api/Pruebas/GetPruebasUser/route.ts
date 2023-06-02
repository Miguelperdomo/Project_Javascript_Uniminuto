import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";
  const IdUser = searchParams.get("IdUser") || "";
  const IdPrueba = searchParams.get("IdPrueba") || "";

  try {
    const [PruebasResult]: any = await connectionPool.query(
      `SELECT parametros_pruebas.subSedeId as CoaId, parametros_pruebas.tipo as TipoPrueba, parametros_pruebas.semestre  as Semestre,pfc_programa.pro_id as IdPrograma, pfc_programa.pro_nom as NombrePrograma, parametros_pruebas.DateDocentesInicio , parametros_pruebas.DateDocentesFin, pfc_ejes.eje_id as IdCompetencia, pfc_ejes.eje_nom as CompetenciaNombre,parametros_pruebas.id as PruebasId FROM parametros_pruebas INNER JOIN asignacionPrueba ON (parametros_pruebas.id=asignacionPrueba.prueba) INNER JOIN pfc_ejes ON(pfc_ejes.eje_id=asignacionPrueba.competencia) INNER JOIN pfc_programa ON (pfc_programa.pro_id=parametros_pruebas.programa) WHERE parametros_pruebas.subSedeId='${SubSede}' and asignacionPrueba.docente='${IdUser}' ${
        IdPrueba && `AND parametros_pruebas.id='${IdPrueba}'`
      }`
    );

    let newDataFormated = PruebasResult?.reduce((acc: any, prueba: any) => {
      const key = prueba.PruebasId;
      if (!acc[key]) {
        acc[key] = prueba;
      }
      return acc;
    }, {});

    const Pruebas: any = Object.values(newDataFormated)?.filter(
      (prueba: any) => {
        const {
          CoaId,
          TipoPrueba,
          Semestre,
          IdPrograma,
          NombrePrograma,
          DateDocentesInicio,
          DateDocentesFin,
          IdCompetencia,
          CompetenciaNombre,
          PruebasId,
        } = prueba;

        // convert DateDocentesInicios a milisigundos para comparar
        const DateDocentesInicioMilisegundos = new Date(
          DateDocentesInicio
        ).getTime();
        const DateDocentesFinMilisegundos = new Date(DateDocentesFin).getTime();

        // convertir fecha actual a milisegundos
        const DateNowMilisegundos = new Date().getTime();

        // comparar fechas

        const isDateDocentesInicio =
          DateNowMilisegundos >= DateDocentesInicioMilisegundos;

        console.log("isDateDocentesInicio", isDateDocentesInicio);

        const isDateDocentesFin =
          DateNowMilisegundos <= DateDocentesFinMilisegundos;

        console.log("isDateDocentesFin", isDateDocentesFin);
        console.log("DateNowMilisegundos", DateNowMilisegundos);

        const isDateDocentes = isDateDocentesInicio && isDateDocentesFin;

        if (isDateDocentes) {
          return {
            prueba,
          };
        }
      }
    );

    return NextResponse.json(
      { pruebas: Pruebas || [] },
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
