import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const programa = searchParams.get("programa") || "";

  try {
    if (programa) {
      const [SemestreRes]: any = await connectionPool.query(`
        SELECT sem_id as Id,sem_nom as Nombre FROM parametros_pruebas INNER JOIN pfc_semestre ON pfc_semestre.sem_id = parametros_pruebas.semestre WHERE  programa=${programa} ORDER BY sem_id
  
      `);
      return NextResponse.json(
        { semestres: SemestreRes },
        {
          status: 200,
        }
      );
    }

    // let Pruebas = [];

    // if (Values.TipoPrueba == "SP") {
    //   const [PruebaRes]: any = await connectionPool.query(`
    //   SELECT id as Id FROM parametros_pruebas WHERE tipo="SP" AND programa=${Values.Programa} AND semestre="1,3,6,9"
    //   `);
    //   Pruebas = PruebaRes?.map((item: any, key: any) => {
    //     return {
    //       Id: item.Id,
    //       Nombre: `Prueba #${key + 1}`,
    //     };
    //   });
    // } else {
    //   const [PruebaRes]: any = await connectionPool.query(`
    //   SELECT id as Id FROM parametros_pruebas WHERE tipo="SS" AND programa=${Values.Programa} AND semestre='${Values?.Semestre}'
    //   `);

    //   Pruebas = PruebaRes?.map((item: any, key: any) => {
    //     return {
    //       Id: item.Id,
    //       Nombre: `Prueba #:${key + 1}`,
    //     };
    //   });
    // }
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
