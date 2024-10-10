import { google } from "googleapis";
import { NextResponse } from "next/server";

// Load service account credentials from environment variables
const credentials = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string,
);

// Google Calendar API authentication
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/calendar.events"], // Make sure you have the correct scope
});

const calendar = google.calendar({ version: "v3", auth });

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, start, end } = body;

  try {
    const event = {
      summary: `Meeting with ${name}`,
      description: `A booking for ${name}, email: ${email}`,
      start: {
        dateTime: start,
        timeZone: "America/New_York", // or use the user's timezone
      },
      end: {
        dateTime: end,
        timeZone: "America/New_York", // or use the user's timezone
      },
      attendees: [{ email }],
    };

    const response = await calendar.events.insert({
      calendarId: "primary", // Use the user's primary calendar
      requestBody: event,
    });

    return NextResponse.json({ success: true, event: response.data });
  } catch (error: unknown) {
    // Type check the error object
    if (error instanceof Error) {
      console.error("Error creating Google Calendar event", error.message);
      return NextResponse.json({ success: false, error: error.message });
    } else {
      console.error("Unknown error occurred", error);
      return NextResponse.json({
        success: false,
        error: "Unknown error occurred",
      });
    }
  }
}
