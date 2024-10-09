// app/api/available-bookings/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const res = await fetch(
    `https://tidycal.com/booking-types/1dz87zd/available-bookings?start=${start}&end=${end}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "cache-control": "no-cache",
        dnt: "1",
        pragma: "no-cache",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
