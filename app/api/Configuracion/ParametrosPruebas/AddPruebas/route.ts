import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const {
      CompetenciaEspecifica,
      CompetenciaGenerica,
      startDateDocentes,
      endDateDocentes,
      StartDateAprobacion,
      EndDateAprobacion,
      startDateEstudiantes,
      endDateEstudiantes,
      SubSede,
      InfoPrueba,
    } = await req?.json();

    console.log(CompetenciaGenerica);

    let sqlParametrosPruebasBase = `INSERT INTO parametros_pruebas (subSedeId,tipo,semestre,programa,DateDocentesInicio,DateDocentesFin,DateEstudiantesInicio,DateEstudiantesFin,DataAprobacionInicio,DataAprobacionEnd) VALUES `;

    let sqlAsignacionPruebaBase = `INSERT INTO asignacionPrueba (competencia,docente,prueba,Hora,Minutos,LinkMooc) VALUES`;

    let NotificationDocente = `INSERT INTO notifications (user_id,message,date_range_start,date_range_end,Rol,Link) VALUES`;

    if (InfoPrueba?.TypeTest === "SP") {
      sqlParametrosPruebasBase += `('${SubSede}','SP', '${
        InfoPrueba?.SemestreAcademico || ""
      }', '${InfoPrueba.Programa}','${startDateDocentes?.substring(
        0,
        10
      )}', '${endDateDocentes?.substring(
        0,
        10
      )}','${startDateEstudiantes?.substring(
        0,
        10
      )}','${endDateEstudiantes?.substring(
        0,
        10
      )}','${StartDateAprobacion?.substring(
        0,
        10
      )}', '${EndDateAprobacion?.substring(0, 10)}')`;

      const [AddPrueba]: any = await connectionPool.query(
        sqlParametrosPruebasBase
      );

      if (AddPrueba.affectedRows == 0) {
        return NextResponse.json(
          {
            body: "No se pudo agregar la prueba.",
          },
          {
            status: 400,
          }
        );
      }

      if (CompetenciaGenerica?.length) {
        CompetenciaGenerica?.forEach((element: any) => {
          if (element?.DocenteAsignado?.Id) {
            sqlAsignacionPruebaBase += `('${element?.Id || ""}', '${
              element?.DocenteAsignado?.Id
            }', '${AddPrueba.insertId}','${element.Hora || 0}','${
              element.Minutos || 0
            }','${element?.LinkMock || ""}'),`;

            NotificationDocente += `('${
              element?.DocenteAsignado?.Id
            }','Se le ha asignado subir preguntas para las competencia <span style="color: #584ed0;"> ${
              element?.Nombre
            } </span> .','${startDateEstudiantes?.substring(
              0,
              10
            )}', '${endDateEstudiantes?.substring(
              0,
              10
            )}','2','/Pruebas/IngresoPreguntas?SubSede=${SubSede}&IdRol=2&IdUser=${
              element?.DocenteAsignado?.Id
            }&IdPrueba=${AddPrueba.insertId}'),`;
          }
        });
      }

      if (CompetenciaEspecifica?.length) {
        CompetenciaEspecifica?.forEach((element: any) => {
          if (element?.DocenteAsignado?.Id) {
            sqlAsignacionPruebaBase += `('${element?.Id || ""}', '${
              element?.DocenteAsignado?.Id
            }', '${AddPrueba.insertId}','${element.Hora || 0}','${
              element.Minutos || 0
            }','${element?.LinkMock || ""}'),`;

            NotificationDocente += `('${
              element?.DocenteAsignado?.Id
            }','Se le ha asignado subir preguntas para las competencia <span style="color: #584ed0;"> ${
              element?.Nombre
            } </span> .','${startDateEstudiantes?.substring(
              0,
              10
            )}', '${endDateEstudiantes?.substring(
              0,
              10
            )}','2','/Pruebas/IngresoPreguntas?SubSede=${SubSede}&IdRol=2&IdUser=${
              element?.DocenteAsignado?.Id
            }&IdPrueba=${AddPrueba.insertId}'),`;
          }
        });
      }

      sqlAsignacionPruebaBase = sqlAsignacionPruebaBase.substring(
        0,
        sqlAsignacionPruebaBase.length - 1
      );

      NotificationDocente = NotificationDocente.substring(
        0,
        NotificationDocente.length - 1
      );

      const [AddAsignacionPrueba]: any = await connectionPool.query(
        sqlAsignacionPruebaBase
      );
      const [AddNotificationDocente]: any = await connectionPool.query(
        NotificationDocente
      );

      return NextResponse.json(
        {
          body: "La prueba ha sido agregada con éxito.",
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
