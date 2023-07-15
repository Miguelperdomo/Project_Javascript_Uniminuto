import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function POST(req: NextRequest) {
  try {
    const { SemestreSigla, Sigla, Grado, Periodicidad, Semestre } =
      await req?.json();

    const [MaxGrupoRes]: any =
      await connectionPool.query(`SELECT MAX(pfc_grupo_nom) as MaxGrupo FROM pfc_grupos WHERE pfc_grado_id =${Grado}
    `);
    const MaxGrupo = MaxGrupoRes[0]?.MaxGrupo?.toString()?.slice(
      MaxGrupoRes[0]?.MaxGrupo?.toString()?.length - 2,
      MaxGrupoRes[0]?.MaxGrupo?.toString()?.length
    );
    const NewGrupo = parseInt(MaxGrupo) + 1;

    console.log(MaxGrupoRes);

    console.log(
      "--",
      `INSERT INTO pfc_grupos (pfc_grado_id, pfc_grupo_sem, pfc_grupo_nom ) VALUES ('${Grado}','${Semestre}','${Sigla}-${Periodicidad}S${SemestreSigla}-${
        NewGrupo?.toString()?.length === 1 ? `0${NewGrupo}` : NewGrupo
      }')`
    );

    const [GrupoRes]: any = await connectionPool.query(
      `INSERT INTO pfc_grupos (pfc_grado_id, pfc_grupo_sem, pfc_grupo_nom ) VALUES ('${Grado}','${Semestre}','${Sigla}-${Periodicidad}S${SemestreSigla}-${
        NewGrupo?.toString()?.length === 1 ? `0${NewGrupo}` : NewGrupo
      }')`
    );

    return NextResponse.json(
      { body: "Grupo agregado" },
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
