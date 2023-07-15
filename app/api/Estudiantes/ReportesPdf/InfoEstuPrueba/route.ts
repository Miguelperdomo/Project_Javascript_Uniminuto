import connectionPool from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {
    const IdPrueba = searchParams.get("IdPrueba");
    const SubSede = searchParams.get("SubSede");
    const IdRol = searchParams.get("IdRol");
    const IdUser = searchParams.get("IdUser");
    const Doc = searchParams.get("Doc");

    const [InfoMatriculaEstudiante]: any = await connectionPool.query(
      `SELECT programa,semestre,matri_id FROM pfc_matricula WHERE alumno_id='${IdUser}' and subSedeId='${SubSede}'`
    );
    const { programa, semestre, matri_id } = InfoMatriculaEstudiante[0];

    const [competenciasRes]: any = await connectionPool.query(`
    SELECT preguntas_pruebas.id as PreguntaId,preguntas_pruebas.tipo as TipoPregunta,preguntas_pruebas.padre,pfc_ejes.eje_id idCompetencia, pfc_ejes.eje_nom CompetenciaNombre,punto,pfc_ejes.eje_tip as TipoCompetencia,preguntas_pruebas.respuesta,preguntas_pruebas.prueba as IdPrueba,asignacionPrueba.Hora,asignacionPrueba.Minutos FROM preguntas_pruebas LEFT JOIN asignacionPrueba ON (asignacionPrueba.prueba=preguntas_pruebas.prueba) INNER JOIN pfc_ejes ON pfc_ejes.eje_id=preguntas_pruebas.competencia WHERE preguntas_pruebas.prueba='${IdPrueba}' and preguntas_pruebas.aprobo=2 ORDER BY TipoCompetencia,RAND() desc
    `);

    console.log(`
    SELECT preguntas_pruebas.id as PreguntaId,preguntas_pruebas.tipo as TipoPregunta,preguntas_pruebas.padre,pfc_ejes.eje_id idCompetencia, pfc_ejes.eje_nom CompetenciaNombre,punto,pfc_ejes.eje_tip as TipoCompetencia,preguntas_pruebas.respuesta,preguntas_pruebas.prueba as IdPrueba,asignacionPrueba.Hora,asignacionPrueba.Minutos FROM preguntas_pruebas INNER JOIN pfc_ejes ON pfc_ejes.eje_id=preguntas_pruebas.competencia INNER JOIN asignacionPrueba ON (asignacionPrueba.competencia=pfc_ejes.eje_id) WHERE preguntas_pruebas.prueba='${IdPrueba}' and preguntas_pruebas.aprobo=2 ORDER BY TipoCompetencia,RAND() desc
    `);

    const [ResponsePruebaEstudiante]: any = await connectionPool.query(
      `SELECT respuestas_estudiante.id as RespuestaId,respuestas_estudiante.respuesta RespuestaEstudiante, preguntas_pruebas.respuesta as RespuestaCorrecta,preguntas_pruebas.punto as PuntosPregunta,preguntas_pruebas.competencia as CompetenciaPregunta FROM respuestas_estudiante INNER JOIN preguntas_pruebas ON respuestas_estudiante.pregunta=preguntas_pruebas.id WHERE respuestas_estudiante.prueba='${IdPrueba}' and respuestas_estudiante.estudiante='${matri_id}' `
    );

    const [DatosUniversidadRes]: any = await connectionPool.query(
      `SELECT * FROM datosUniversidad  where idCoa='${SubSede}'`
    );

    const [InformacionEstudiante]: any = await connectionPool.query(
      `SELECT concat(alumno_ape1," ",alumno_ape2," ",alumno_nom1," ",alumno_nom2)as NombreCompleto,alumno_num_docu as NumeroDocumento,alumno_email as Correo,alumno_celular as Celular FROM pfc_alumno where alumno_id='${IdUser}'`
    );

    let DataNormalizada: any = [];

    for (const ItemCompetencia of competenciasRes) {
      for (const ItemRespuestaEstudiante of ResponsePruebaEstudiante) {
        if (
          ItemCompetencia.idCompetencia ==
          ItemRespuestaEstudiante.CompetenciaPregunta
        ) {
          let RespuestasCorrectas: any = [];
          let PuntosCompetencia: any = null;

          if (
            ItemRespuestaEstudiante?.RespuestaEstudiante?.toLowerCase() ==
            ItemCompetencia?.respuesta?.toLowerCase()
          ) {
            // console.log(
            //   "PuntosPregunta",
            //   ItemRespuestaEstudiante.PuntosPregunta
            // );

            PuntosCompetencia += parseInt(
              ItemRespuestaEstudiante.PuntosPregunta
            );
            RespuestasCorrectas.push({
              RespuestaEstudiante: ItemRespuestaEstudiante.RespuestaEstudiante,
              RespuestaCorrecta: ItemCompetencia.respuesta,
              PuntosPregunta: ItemCompetencia.PuntosPregunta,
            });
          }

          DataNormalizada.push({
            ...ItemCompetencia,
            ...ItemRespuestaEstudiante,
            RespuestasCorrectas: RespuestasCorrectas,
            PuntosCompetencia: PuntosCompetencia || 0,
          });
        } else {
          DataNormalizada.push({
            ...ItemCompetencia,
            ...ItemRespuestaEstudiante,
            RespuestasCorrectas: [],
            PuntosCompetencia: 0,
          });
        }
      }
    }

    // console.log("DataNormalizada", DataNormalizada);

    const DataOrganizada = DataNormalizada?.reduce((acc: any, item: any) => {
      let key = `${item?.CompetenciaNombre}`;
      if (!acc[key]) {
        acc[key] = {
          CompetenciaNombre: item?.CompetenciaNombre,
          TipoCompetencia: item?.TipoCompetencia,
          PuntosCompetencia: item?.PuntosCompetencia,
          RespuestasCorrectas: item?.RespuestasCorrectas,
          PreguntaId: item?.PreguntaId,
          TipoPregunta: item?.TipoPregunta,
          Preguntas: [],
          TotalPuntos: 0,
        };
      }
      acc[key]?.Preguntas?.push(item);
      acc[key].TotalPuntos += parseInt(item.PuntosCompetencia) || 0;
      return acc;
    }, {});

    // console.log("DataOrganizada", DataOrganizada);

    return NextResponse.json(
      {
        Competencias: Object.values(DataOrganizada) || [],
        DatosUniversidad: DatosUniversidadRes[0] || {},
        InformacionEstudiante: InformacionEstudiante[0] || {},
      },
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
