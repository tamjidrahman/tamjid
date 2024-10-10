import { google } from "googleapis";
import { NextResponse } from "next/server";

// Load service account credentials from environment variables
const credentials = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string,
);

// Google Calendar API authentication using environment variables
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

// Initialize Google Calendar API
const calendar = google.calendar({ version: "v3", auth });

// Days of the week that are bookable (0 = Sunday, 2 = Tuesday, 3 = Wednesday)
const VALID_DAYS = [0, 2, 3]; // Sunday = 0, Tuesday = 2, Wednesday = 3

// Morning hours range (6:00 AM to 12:00 PM)
const MORNING_START_HOUR = 9;
const MORNING_END_HOUR = 13;

const TIMEZONE = "America/New_York";
const SLOT_DURATION_MINUTES = 30; // Duration of each booking slot in minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "Start and end parameters are required." },
      { status: 400 },
    );
  }

  try {
    const freeSlots = await calculateFreeSlots(start, end);
    return NextResponse.json(freeSlots);
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events." },
      { status: 500 },
    );
  }
}

// Function to calculate free slots in 30-minute intervals based on gaps between events
async function calculateFreeSlots(start: string, end: string) {
  console.log(start, new Date(start).toISOString());
  const response = await calendar.events.list({
    calendarId: "tamjidarrahman@gmail.com", // Use the primary calendar or specific calendar ID
    timeMin: new Date(start).toISOString(),
    timeMax: new Date(end).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    timeZone: TIMEZONE,
  });

  const events = response.data.items || [];

  // Parse events and find free gaps in the morning of Sunday, Tuesday, and Wednesday
  const freeTimes: { start: string; end: string }[] = [];

  let currentTime = new Date(start);
  const endTime = new Date(end);

  while (currentTime < endTime) {
    const dayOfWeek = currentTime.getDay();

    // Check if the current day is valid (Sunday, Tuesday, or Wednesday)
    if (VALID_DAYS.includes(dayOfWeek)) {
      // Set the morning time range for the day
      const availabilityStart = new Date(currentTime);
      availabilityStart.setHours(MORNING_START_HOUR, 0, 0, 0);

      const availabilityEnd = new Date(currentTime);
      availabilityEnd.setHours(MORNING_END_HOUR, 0, 0, 0);

      let freeStart = new Date(availabilityStart);

      // Check gaps between events and mark them as free time
      for (const event of events) {
        const eventStart = event.start?.dateTime
          ? new Date(event.start.dateTime)
          : new Date(`${event.start?.date}T00:00:00`); // If it's an all-day event, default to 00:00

        const eventEnd = event.end?.dateTime
          ? new Date(event.end.dateTime)
          : new Date(`${event.end?.date}T23:59:59`); // If it's an all-day event, default to 23:59

        // If there's a gap between freeStart and the event, add it as free time
        if (freeStart < eventStart && eventStart < availabilityEnd) {
          freeTimes.push({
            start: freeStart.toISOString(),
            end: eventStart.toISOString(),
          });
          freeStart = eventEnd > freeStart ? eventEnd : freeStart; // Move freeStart past the event
        }

        // Break if the event ends past the morning period
        if (eventEnd > availabilityEnd) {
          break;
        }
      }

      // If there's still free time left after the last event, add it
      if (freeStart < availabilityEnd) {
        freeTimes.push({
          start: freeStart.toISOString(),
          end: availabilityEnd.toISOString(),
        });
      }
    }

    // Move to the next day
    currentTime.setDate(currentTime.getDate() + 1);
  }

  // Now split each free time range into 30-minute slots
  const freeSlots = freeTimes.flatMap(({ start, end }) => {
    const slots = [];
    let slotStart = new Date(start);
    const slotEnd = new Date(end);

    while (slotStart < slotEnd) {
      const slotFinish = new Date(slotStart);
      slotFinish.setMinutes(slotFinish.getMinutes() + SLOT_DURATION_MINUTES);

      // Ensure we don't go beyond the free period end
      if (slotFinish > slotEnd) break;

      slots.push({
        start: slotStart.toISOString(),
        end: slotFinish.toISOString(),
      });

      // Move to the next slot
      slotStart = new Date(slotFinish);
    }

    return slots;
  });

  return freeSlots;
}
