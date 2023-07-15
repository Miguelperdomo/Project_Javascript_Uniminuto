import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { Nombre, Sigla, IdSubSede, Periodicidad } = await req?.json();

    if (Nombre && Sigla) {
      const [verificarExistencia]: any = await connectionPool.query(
        `SELECT * FROM pfc_programa where pro_nom='${Nombre}' and subSedeId='${IdSubSede}'`
      );

      if (verificarExistencia.length) {
        return NextResponse.json(
          { body: "El programa ya existe" },
          {
            status: 400,
          }
        );
      }

      const [addPrograma]: any = await connectionPool.query(`
          INSERT INTO pfc_programa (pro_nom, pro_sigla,subSedeId,periodicidad) VALUES ('${Nombre}', '${Sigla}','${IdSubSede}','${Periodicidad}')
        `);

      const Recarga = {
        Id: addPrograma.insertId,
        Nombre: Nombre,
        Sigla: Sigla,
      };

      return NextResponse.json(
        { body: "Programa agregado correctamente", programa: Recarga },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { body: "Faltan datos" },
        {
          status: 400,
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
