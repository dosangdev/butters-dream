import { NextResponse } from "next/server";
import ky from "ky";

export async function GET() {
  try {
    const apikey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY;

    const response = await ky.get(`https://api.basescan.org/api
?module=logs
&action=getLogs
&address=0x36E6E2669c461c0e8f69764632b3b1dB3A798D1A
&page=1
&offset=1000
&apikey=${apikey}`);
    const data = await response.json();
    return NextResponse.json(data); // JSON 응답 반환
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch wallet logs" },
      { status: 500 }
    );
  }
}
