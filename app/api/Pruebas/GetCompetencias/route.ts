import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { Values } = await req?.json();
    console.log("Values", Values);

    let competencias = {};

    if (Values?.TipoPrueba == "SP" && Values?.IdRol == "2") {
      const [competenciasRes]: any = await connectionPool.query(`
      SELECT asignacionPrueba.id as Id,pfc_ejes.eje_tip as Tipo,pfc_ejes.eje_nom as Nombre, asignacionPrueba.competencia AS idCompetencia , asignacionPrueba.Hora, asignacionPrueba.Minutos FROM asignacionPrueba INNER JOIN parametros_pruebas ON (asignacionPrueba.prueba=parametros_pruebas.id) INNER JOIN pfc_ejes on (asignacionPrueba.competencia=pfc_ejes.eje_id) WHERE parametros_pruebas.id = '${Values?.PruebasId}' AND parametros_pruebas.tipo ='${Values?.TipoPrueba}' AND parametros_pruebas.programa='${Values?.IdPrograma}' AND parametros_pruebas.semestre = '${Values?.Semestre}' AND parametros_pruebas.subSedeId ='${Values?.CoaId}' AND asignacionPrueba.docente = '${Values?.IdUser}' 
      `);

      const competenciaFormated = [];
      for (const competencia of competenciasRes) {
        const [preguntas]: any = await connectionPool.query(
          `SELECT * FROM preguntas_pruebas WHERE competencia = ${competencia?.idCompetencia} AND prueba = ${Values.PruebasId} AND tipo != 100`
        );
        console.log(``);
        competenciaFormated.push({
          ...competencia,
          cantidad: preguntas.length,
          preguntas: preguntas,
        });
      }
      competencias = competenciaFormated?.reduce((acc: any, item: any) => {
        let key = item.Tipo;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
    } else {
      const [competenciasRes]: any = await connectionPool.query(`
      SELECT asignacionPrueba.id as Id,pfc_ejes.eje_tip as Tipo,pfc_ejes.eje_nom as Nombre, asignacionPrueba.competencia AS idCompetencia , asignacionPrueba.Hora, asignacionPrueba.Minutos FROM asignacionPrueba INNER JOIN parametros_pruebas ON (asignacionPrueba.prueba=parametros_pruebas.id) INNER JOIN pfc_ejes on (asignacionPrueba.competencia=pfc_ejes.eje_id) WHERE parametros_pruebas.id = '${Values?.Prueba}' AND parametros_pruebas.tipo='${Values?.TipoPrueba}' AND parametros_pruebas.programa='${Values?.Programa}' AND parametros_pruebas.semestre='${Values.Semestre}'
      `);

      competencias = competenciasRes?.reduce((acc: any, item: any) => {
        let key = item.Tipo;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
    }

    console.log("competencias", competencias);

    return NextResponse.json(
      { competencias: competencias },
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
