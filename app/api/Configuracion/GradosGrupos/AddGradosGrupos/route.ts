import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const {
      IdSubSede,
      ProgramAcademico,
      Sigla,
      Periodisidad,
      SemestreAcademico,
      SemestresId,
      SiglaSemestre,
      NumeroGrupos,
    } = await req?.json();

    const [VerificarExistencia]: any = await connectionPool.query(`
      SELECT * FROM pfc_grados 
                      WHERE pro_id = '${ProgramAcademico}'
                          AND sem_id = '${SemestreAcademico}'
              AND subSedeId = '${IdSubSede}'
      `);

    if (VerificarExistencia?.length > 0) {
      return NextResponse.json(
        { body: "Ya existe un registro con estos datos" },
        {
          status: 400,
        }
      );
    }

    const [AddGrados]: any = await connectionPool.query(
      `INSERT INTO pfc_grados (pro_id, sem_id, pfc_grado_sem,subSedeId) values ('${ProgramAcademico}','${SemestresId}','${SemestreAcademico}','${IdSubSede}') `
    );

    let sqlBase =
      "INSERT INTO pfc_grupos (pfc_grado_id, pfc_grupo_sem, pfc_grupo_nom) values ";

    for (let i = 1; i <= NumeroGrupos; i++) {
      sqlBase += `('${
        AddGrados.insertId
      }','${SemestreAcademico}','${Sigla}-${Periodisidad}S${SiglaSemestre}-${
        i?.toString()?.length === 1 ? `0${i}` : i
      }'),`;
    }

    sqlBase = sqlBase.slice(0, -1);

    console.log(sqlBase);

    const [AddGrupos]: any = await connectionPool.query(sqlBase);

    return NextResponse.json(
      { body: "Semestre y grupos creado con éxito" },
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
