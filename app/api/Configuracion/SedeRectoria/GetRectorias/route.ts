import connectionPool from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [GetRectorias]: any = await connectionPool.query(
      `
        SELECT id as Id, nombre as Nombre FROM rectorias
        `
    );

    return NextResponse.json(
      { rectorias: GetRectorias },
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
