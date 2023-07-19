import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const SubSede = searchParams.get("SubSede") || "";

  try {
    const { data, text, competencia, prueba, semestre, IdRol, IdUser } =
      await req?.json();

    const [competencias]: any = await connectionPool.query(
      `SELECT eje_id, eje_nom FROM asignacionPrueba INNER JOIN pfc_ejes ON pfc_ejes.eje_id = asignacionPrueba.competencia WHERE prueba = ${prueba}`
    );

    const competenciaFind = competencias.filter((e: any) =>
      e.eje_nom.toLowerCase().includes(`${competencia.toLowerCase()}`)
    );

    const [padre]: any = await connectionPool.query(
      `INSERT INTO preguntas_pruebas(tipo, pregunta, competencia, prueba, IdDocente) VALUES(3, '${text}', '${competenciaFind[0]?.eje_id}', '${prueba}', '${IdUser}')`
    );

    const hijosPromises = data.map(async (element: any) => {
      // Verificar que element.Opciones sea un arreglo válido
      if (Array.isArray(element?.Opciones)) {
        let Opciones = element.Opciones.map((opcion: string, key: number) => {
          const respuesta = element?.Respuestas?.[key] || "";
          return `${opcion}~${respuesta}`;
        }).join("@");

        const insertHijoQuery = `INSERT INTO preguntas_pruebas(tipo, padre, pregunta, opciones, respuesta, punto, competencia, prueba) VALUES (3, ${
          padre?.insertId || 0
        }, '${element?.Pregunta}', '${Opciones}', '${element?.correcta}', '${
          element?.puntos
        }', '${competenciaFind[0]?.eje_id}', '${prueba}')`;

        return connectionPool.query(insertHijoQuery);
      }

      // Si no hay opciones válidas, se omite la inserción
      return null;
    });

    // Filtrar las inserciones nulas (opciones inválidas)
    const validInserts = await Promise.all(hijosPromises);
    const validInsertQueries = validInserts.filter((insert) => insert !== null);

    // Ejecutar solo las inserciones válidas
    await Promise.all(validInsertQueries);

    return NextResponse.json(
      { body: "La información fue ingresada con éxito" },
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
