import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const MunicipioClicked = searchParams.get("MunicipioClicked") || "";

  try {
    const [RespuestasSedes]: any = await connectionPool.query(
      `SELECT subSedes.nombre as NombreCoa ,subSedes.id as IdCoa , sedes.nombreSede as NombreSede, sedes.id as IdSede from municipio INNER JOIN datosUniversidad ON datosUniversidad.municipioId = municipio.municipio_id INNER JOIN subSedes ON subSedes.id = datosUniversidad.idCoa INNER JOIN dpto ON dpto.id = municipio.departamento_id INNER JOIN sedes ON sedes.id = subSedes.idSede WHERE dpto.nombre LIKE '${MunicipioClicked}'`
    );

    // console.log("RespuestasSedes======", RespuestasSedes);

    if (RespuestasSedes?.length > 0) {
      const newData = RespuestasSedes?.reduce((acc: any, item: any) => {
        const { NombreSede } = item;

        let key = `${NombreSede}`;
        let value = { NombreSede: "", COA: [] };

        if (!acc[key]) {
          acc[key] = value;
        }

        acc[key].COA.push({
          ...item,
        });

        acc[key].NombreSede = `${NombreSede}`;

        return acc;
      }, {});

      return NextResponse.json(
        { infoSedes: Object.values(newData) },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          body: "No se han ingresado Sedes en esta Rectoría",
        },
        {
          status: 200,
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
