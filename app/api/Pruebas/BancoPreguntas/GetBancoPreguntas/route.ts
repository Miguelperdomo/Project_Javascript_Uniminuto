import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const Coa = searchParams.get("Coa") || "";
  const Tipo = searchParams.get("Tipo") || "";

  try {
    const [Preguntas]: any = await connectionPool.query(`
    SELECT preguntas_pruebas.id as PreguntaId,preguntas_pruebas.pregunta as Pregunta,preguntas_pruebas.opciones as opciones,preguntas_pruebas.respuesta ,subSedes.nombre as NombreCoa, pfc_programa.pro_nom as NombrePrograma,parametros_pruebas.tipo as Tipo,preguntas_pruebas.tipo as TipoPregunta,pfc_ejes.eje_id as IdCompetencia, pfc_ejes.eje_nom as NombreCompetencia,preguntas_pruebas.padre,pfc_ejes.eje_tip as TipoCompetencia,concat(dcne.dcne_nom1, " ",dcne.dcne_nom2, " ",dcne.dcne_ape1, " ",dcne.dcne_ape2) as NombreCompleto FROM preguntas_pruebas INNER JOIN parametros_pruebas ON (parametros_pruebas.id=preguntas_pruebas.prueba) INNER JOIN subSedes ON (subSedes.id=parametros_pruebas.subSedeId) INNER JOIN pfc_programa ON (pfc_programa.pro_id= parametros_pruebas.programa) INNER JOIN pfc_ejes ON pfc_ejes.eje_id=preguntas_pruebas.competencia INNER JOIN dcne ON dcne.i=preguntas_pruebas.IdDocente where parametros_pruebas.subSedeId='${Coa}' and parametros_pruebas.tipo='${Tipo}' AND preguntas_pruebas.aprobo='2'
      `);

    let newData: any[] = [];

    for (const item of Preguntas) {
      if (item.TipoPregunta == 3) {
        newData.push({
          ...item,
          Preguntas: [],
        });
      } else {
        if (item.TipoPregunta != 100) {
          newData.push({
            ...item,
          });
        }

        if (item.TipoPregunta == 100) {
          const keyIndex = newData?.findIndex(
            (x) => x.PreguntaId == item.padre
          );
          newData[keyIndex]?.Preguntas?.push({
            ...item,
          });
        }
      }
    }

    const newArrayPreguntas = newData?.reduce((acc: any, item: any) => {
      let key = `${item.NombrePrograma}-${item.TipoCompetencia}`;

      if (!acc[key]) {
        acc[key] = {
          NombrePrograma: item.NombrePrograma,
          NombreCoa: item.NombreCoa,
          NombreCompetencia: item.NombreCompetencia,
          TipoPrueba: item.Tipo,
          TipoPregunta: item.TipoPregunta,
          TipoCompetencia: item.TipoCompetencia,
          id: item.PreguntaId,
          Preguntas: [],
        };
      }

      acc[key].Preguntas.push({
        ...item,
      });
      return acc;
    }, {});

    return NextResponse.json(
      { Preguntas: Object.values(newArrayPreguntas) || [] },
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
