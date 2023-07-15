import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET() {
  try {
    const [SubSedesRes]: any = await connectionPool.query(`
      select id as Id, nombre as NombreSubSede from subSedes `);

    return NextResponse.json(
      { SubSedes: SubSedesRes },
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
