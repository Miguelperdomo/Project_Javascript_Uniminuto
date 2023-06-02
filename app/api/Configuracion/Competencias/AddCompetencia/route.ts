import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { NombreCompetencia, Abreviatura, TipoCompetencia, IdSubSede } =
      await req?.json();

    const [verificarExistencia]: any = await connectionPool.query(
      `SELECT * FROM pfc_ejes where eje_nom='${NombreCompetencia}' and subSedeId='${IdSubSede}'`
    );

    if (verificarExistencia.length) {
      return NextResponse.json(
        { body: "Esta competencia ya existe" },
        {
          status: 400,
        }
      );
    }

    const [Maxcodigo]: any = await connectionPool.query(
      `SELECT MAX(eje_cod) as codigo FROM pfc_ejes`
    );
    let codigo = "";
    if (Maxcodigo[0]?.codigo > 9 && Maxcodigo[0]?.codigo) {
      codigo = `0${parseInt(Maxcodigo[0]?.codigo) + 1}`;
    } else if (Maxcodigo[0]?.codigo) {
      codigo = `${parseInt(Maxcodigo[0]?.codigo) + 1}`;
    }
    const [addPrograma]: any = await connectionPool.query(`
      INSERT INTO pfc_ejes (eje_cod, eje_nom, eje_abr,eje_tip,subSedeId) VALUES ('${
        codigo || "01"
      }', '${NombreCompetencia}', '${Abreviatura}','${TipoCompetencia}','${IdSubSede}')`);

    return NextResponse.json(
      { body: "Competencia agregada con éxito" },
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
