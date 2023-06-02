import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { RectoriaSelected, SedeRectoriaSelected, NombreCoa, id } =
      await req?.json();

    // verificar existencia de la sede
    const [SedeExist]: any = await connectionPool.query(`
    SELECT id FROM subSedes WHERE nombre = '${NombreCoa}'
  `);

    if (SedeExist.length > 0) {
      return NextResponse.json(
        { body: "La sede ya existe" },
        {
          status: 200,
        }
      );
    }

    const [AddSubSede]: any = await connectionPool.query(`
    INSERT INTO subSedes ( nombre, idSede,id) VALUES ( '${NombreCoa}', '${SedeRectoriaSelected}', '${id}')`);

    const [AddUniversidad]: any = await connectionPool.query(
      `INSERT INTO datosUniversidad (idCoa,nombreUniversidad,siglaUniversidad) values ('${id}','${NombreCoa}','UNIMINUTO')`
    );

    if (AddSubSede.affectedRows === 0) {
      return NextResponse.json(
        { body: "No se puedo agregar el COA" },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { body: "COA agregada con éxito." },
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
