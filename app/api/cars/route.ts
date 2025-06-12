import { BASE_URL } from "@/app/constants/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();

    const res = await fetch(`${BASE_URL}/cars?${query}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from external API." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log("API Route Error:", error);

    return NextResponse.json(
      { error: "Server Error"},
      { status: 500 }
    );
  }
}