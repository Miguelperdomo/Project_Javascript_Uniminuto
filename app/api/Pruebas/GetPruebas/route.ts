import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { Values } = await req?.json();

    let Pruebas = [];

    if (Values.TipoPrueba == "SP") {
      console.log(`
      SELECT id as Id FROM parametros_pruebas WHERE tipo="SP" AND programa=${Values.Programa} AND semestre='${Values?.SemestreAcademico}'
      `);

      const [PruebaRes]: any = await connectionPool.query(`
      SELECT id as Id FROM parametros_pruebas WHERE tipo="SP" AND programa=${Values.Programa}  AND semestre='${Values?.SemestreAcademico}'
      `);
      Pruebas = PruebaRes?.map((item: any, key: any) => {
        return {
          Id: item.Id,
          Nombre: `Prueba #${key + 1}`,
        };
      });
    } else {
      const [PruebaRes]: any = await connectionPool.query(`
      SELECT id as Id FROM parametros_pruebas WHERE tipo="SS" AND programa=${Values.Programa} AND semestre='${Values?.Semestre}'
      `);

      Pruebas = PruebaRes?.map((item: any, key: any) => {
        return {
          Id: item.Id,
          Nombre: `Prueba #:${key + 1}`,
        };
      });
    }

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
