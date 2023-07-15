import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "@/config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  try {
    return NextResponse.json(
      { pruebas: [] || [] },
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
