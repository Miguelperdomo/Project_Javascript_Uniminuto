import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    // const { TipoModulo, ModuloPrincipal, Nombre, NombreModuloPrincipal } =
    //   await req?.json();

    const { InputValues } = await req?.json();

    if (Object.keys(InputValues || {}).length === 0) {
      return NextResponse.json(
        { body: "Datos vacios" },
        {
          status: 400,
        }
      );
    }

    const [VerificarExistencia]: any = await connectionPool.query(`
    SELECT id FROM datosUniversidad WHERE id = '${InputValues.id}'
    `);
    if (VerificarExistencia?.length > 0) {
      const [UpdateDatos]: any = await connectionPool.query(`
      UPDATE datosUniversidad SET nombreUniversidad='${InputValues?.nombreUniversidad}', direccion='${InputValues?.direccion}', idRectoria='${InputValues?.idRectoria}', idSede='${InputValues?.idSede}', municipioId='${InputValues?.municipioId}',telefono1='${InputValues?.telefono1}', telefono2= '${InputValues?.telefono2}', correo='${InputValues?.correo}', web='${InputValues.web}', icfes='${InputValues?.icfes}',
      resolucionSem='${InputValues?.resolucionSem}', nombreRector='${InputValues?.nombreRector}' , siglaUniversidad='${InputValues?.siglaUniversidad}',
      siglaRectoria='${InputValues?.siglaRectoria}',  nit='${InputValues?.nit}' where id = '${InputValues.id}'
      `);

      if (UpdateDatos.affectedRows > 0) {
        return NextResponse.json(
          { body: "Datos Actualizados con éxito" },
          {
            status: 200,
          }
        );
      }
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
