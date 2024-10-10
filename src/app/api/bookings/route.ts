import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    // Validate the required fields
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.slot_date ||
      !bookingData.slot_start_time
    ) {
      return NextResponse.json(
        { error: "Missing required fields in booking data" },
        { status: 400 },
      );
    }

    // Ensure form_responses is included (it can be empty)
    bookingData.form_responses = bookingData.form_responses || {};

    // Make the external API call to book the slot
    const response = await fetch(
      "https://tamjid.neetocal.com/api/external/v1/bookings",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.NEETO_API_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meeting_slug: "connect", // Replace with correct meeting slug
          name: bookingData.name,
          email: bookingData.email,
          time_zone: bookingData.time_zone,
          slot_date: bookingData.slot_date,
          slot_start_time: bookingData.slot_start_time,
          form_responses: { topic: bookingData.topic || "" }, // Ensure this is included for NEETO API
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit booking: ${errorText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error submitting booking:", error);
    return NextResponse.json(
      { error: `Failed to submit booking: ${error}` },
      { status: 500 },
    );
  }
}
