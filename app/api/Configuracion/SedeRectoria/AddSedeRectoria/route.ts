import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { TipoAdd, NombreRectoria, RectoriaSedeId, NombreSede } =
      await req?.json();

    if (TipoAdd === 2) {
      // verificar existencia
      const [ExistenciaRectoria]: any = await connectionPool.query(`
          SELECT id as Id FROM rectorias WHERE nombre = '${NombreRectoria?.toUpperCase()}'
        `);

      if (ExistenciaRectoria?.length > 0) {
        return NextResponse.json(
          { body: "Ya existe una rectoria con ese nombre" },
          {
            status: 400,
          }
        );
      }

      // agregar rectoria
      const [AddRectoria]: any = await connectionPool.query(`
          INSERT INTO rectorias (nombre) VALUES ('${NombreRectoria?.toUpperCase()}')`);

      if (AddRectoria?.affectedRows === 0) {
        return NextResponse.json(
          { body: "No se pudo agregar la rectoría" },
          {
            status: 400,
          }
        );
      } else {
        return NextResponse.json(
          { body: "Rectoría agregada correctamente" },
          {
            status: 200,
          }
        );
      }
    }

    if (TipoAdd === 1) {
      // verificar existencia
      const [ExistensiaSede]: any = await connectionPool.query(`
              SELECT id as Id FROM sedes WHERE nombreSede = '${NombreRectoria?.toUpperCase()}'
          `);
      if (ExistensiaSede?.length > 0) {
        return NextResponse.json(
          { body: "Ya existe una sede con ese nombre" },
          {
            status: 400,
          }
        );
      }

      // agregar sede
      const [AddSede]: any = await connectionPool.query(`
              INSERT INTO sedes (nombreSede,idRectoria) VALUES ('${NombreSede?.toUpperCase()}','${RectoriaSedeId}')`);

      if (AddSede?.affectedRows === 0) {
        return NextResponse.json(
          { body: "No se pudo agregar la sede" },
          {
            status: 400,
          }
        );
      } else {
        return NextResponse.json(
          { body: "Sede agregada correctamente" },
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
