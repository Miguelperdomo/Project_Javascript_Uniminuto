import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const [QuestionsGeneric]: any = await connectionPool.query(
      `SELECT preguntas_pruebas.*,preguntas_pruebas.tipo as TipoPreguntas,parametros_pruebas.tipo,parametros_pruebas.semestre,parametros_pruebas.DateDocentesInicio,parametros_pruebas.DateDocentesFin,pfc_ejes.eje_tip as CompetenciaTipo,pfc_ejes.eje_nom as NombreCompetencia, subSedes.nombre as NombreSede , pfc_programa.pro_id as ProgramaId, pfc_programa.pro_nom as NombrePrograma,preguntas_pruebas.IdDocente,dcne.dcne_nom1 as NombreUno,dcne.dcne_nom2 as NombreDos,dcne.dcne_ape1 as ApellidoUno , dcne.dcne_ape2 as ApellidoDos,preguntas_pruebas.DateCreate FROM preguntas_pruebas INNER JOIN pfc_ejes ON (pfc_ejes.eje_id=preguntas_pruebas.competencia) INNER JOIN parametros_pruebas ON (parametros_pruebas.id = preguntas_pruebas.prueba) INNER JOIN subSedes on subSedes.id=parametros_pruebas.subSedeId INNER JOIN pfc_programa 
      ON pfc_programa.pro_id=parametros_pruebas.programa INNER JOIN dcne ON dcne.i= preguntas_pruebas.IdDocente WHERE parametros_pruebas.subSedeId='${SubSede}' and pfc_ejes.eje_tip='G' ORDER BY preguntas_pruebas.aprobo ASC`
    );

    if (QuestionsGeneric?.length > 0) {
      const NormalizarData = QuestionsGeneric?.reduce((acc: any, item: any) => {
        let key = `${item.CompetenciaTipo}-${item.aprobo}`;

        if (!acc[key]) {
          acc[key] = {
            CompetenciaTipo: item?.CompetenciaTipo,
            aprobo: item?.aprobo,
            Preguntas: [],
          };
        }

        acc[key].Preguntas.push({
          ...item,
        });

        return acc;
      }, {});

      let Aprobadas: {} = {};
      let Pendientes: {} = {};
      let NoAprobadas: {} = {};

      Object.values(NormalizarData).find((item: any) => {
        console.log(item);

        if (item.aprobo == 2) {
          Aprobadas = {
            ...item,
          };
        }
        if (item.aprobo == 0) {
          Pendientes = {
            ...item,
          };
        }
        if (item.aprobo == 1) {
          NoAprobadas = {
            ...item,
          };
        }
      });

      return NextResponse.json(
        {
          Genericas: {
            Aprobadas: Aprobadas || {},
            Pendientes: Pendientes || {},
            NoAprobadas: NoAprobadas || {},
          },
        },
        {
          status: 200,
        }
      );
    }

    // return NextResponse.json(
    //   { pruebas: "" || {} },
    //   {
    //     status: 200,
    //   }
    // );
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
