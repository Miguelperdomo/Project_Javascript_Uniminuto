import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req?.json();

    const [VerificarSedes]: any = await connectionPool.query(
      `SELECT id FROM subSedes WHERE idSede = '${id}' `
    );

    if (VerificarSedes?.length > 0) {
      for (const item of VerificarSedes) {
        const [DeleteUsuarios]: any = await connectionPool.query(`
          DELETE FROM usuario WHERE subsede = '${item.id}'`);
      }
    }

    const [DeleteCOA]: any = await connectionPool.query(`
      DELETE FROM subSedes WHERE idSede = '${id}'`);

    // falta eiminanar
    const [DeleteSede]: any = await connectionPool.query(`
      DELETE FROM sedes WHERE id = '${id}'`);

    return NextResponse.json(
      { body: "Se eliminó correctamente" },
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
