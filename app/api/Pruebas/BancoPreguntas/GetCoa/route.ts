import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  try {
    const [COARESULTS]: any = await connectionPool.query(
      `SELECT id as Id,nombre as Nombre FROM subSedes`
    );

    return NextResponse.json(
      { Coa: COARESULTS || [] },
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
