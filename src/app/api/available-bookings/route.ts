import { google } from "googleapis";
import { NextResponse } from "next/server";
import { DateTime, Interval } from "luxon";

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

// Days of the week that are bookable (Sunday = 7, Tuesday = 2, Wednesday = 3 in Luxon)
const VALID_DAYS = [7, 2, 3];

// Morning hours range (9:00 AM to 1:00 PM in Eastern Time)
const AVAILABILITY_START_HOUR_EASTERN = 9;
const AVAILABILITY_END_HOUR_EASTERN = 13;
const EASTERN_TIMEZONE = "America/New_York";
const SLOT_DURATION_MINUTES = 30; // Duration of each booking slot in minutes

// Make start and end optional to match the Google Calendar API schema
interface FreeBusyPeriod {
  start?: string | null;
  end?: string | null;
}

interface TimeSlot {
  start: string;
  end: string;
}

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
    console.error("Failed to fetch calendar free/busy data:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar free/busy data." },
      { status: 500 },
    );
  }
}

// Function to calculate free slots in 30-minute intervals
async function calculateFreeSlots(
  start: string,
  end: string,
): Promise<TimeSlot[]> {
  const busyPeriods = await getBusyPeriods(start, end);

  const freeSlots: TimeSlot[] = [];
  let currentDate = DateTime.fromISO(start).setZone(EASTERN_TIMEZONE);
  const endDate = DateTime.fromISO(end).setZone(EASTERN_TIMEZONE);

  while (currentDate < endDate) {
    const dayOfWeek = currentDate.weekday;

    // Check if the current day is valid (Sunday, Tuesday, or Wednesday)
    if (VALID_DAYS.includes(dayOfWeek)) {
      // Define the availability window for the day
      const availabilityStart = currentDate
        .set({ hour: AVAILABILITY_START_HOUR_EASTERN, minute: 0 })
        .toUTC();
      const availabilityEnd = currentDate
        .set({ hour: AVAILABILITY_END_HOUR_EASTERN, minute: 0 })
        .toUTC();

      const availabilityInterval = Interval.fromDateTimes(
        availabilityStart,
        availabilityEnd,
      );

      // Subtract busy periods from the availability window
      let freeIntervals = [availabilityInterval];

      for (const busy of busyPeriods) {
        if (busy.start && busy.end) {
          const busyInterval = Interval.fromISO(`${busy.start}/${busy.end}`);
          freeIntervals = freeIntervals.flatMap((free) =>
            free.difference(busyInterval),
          );
        }
      }

      // Convert free intervals into 30-minute slots
      for (const interval of freeIntervals) {
        const slots = splitIntoSlots(interval);
        freeSlots.push(...slots);
      }
    }

    // Move to the next day
    currentDate = currentDate.plus({ days: 1 });
  }

  return freeSlots;
}

// Function to fetch busy periods from the Google Calendar Free/Busy API
async function getBusyPeriods(
  start: string,
  end: string,
): Promise<FreeBusyPeriod[]> {
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(start).toISOString(),
      timeMax: new Date(end).toISOString(),
      items: [{ id: "tamjidarrahman@gmail.com" }],
    },
  });

  const calendars = response.data.calendars;

  // Ensure we safely access the busy periods array
  if (!calendars || !calendars["tamjidarrahman@gmail.com"]) {
    return [];
  }

  return calendars["tamjidarrahman@gmail.com"].busy ?? [];
}

// Helper function to split a time interval into 30-minute slots
function splitIntoSlots(interval: Interval): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let slotStart = interval.start;

  // Ensure slotStart and interval.end are not null
  if (!slotStart || !interval.end) {
    return slots; // Return empty slots array if null
  }

  if (slotStart.minute % SLOT_DURATION_MINUTES !== 0) {
    slotStart = slotStart.plus({
      minutes:
        SLOT_DURATION_MINUTES - (slotStart.minute % SLOT_DURATION_MINUTES),
    });
  }
  while (slotStart < interval.end) {
    const slotEnd = slotStart.plus({ minutes: SLOT_DURATION_MINUTES });

    if (slotEnd > interval.end) break;

    slots.push({
      start: slotStart.toISO()!,
      end: slotEnd.toISO()!,
    });

    slotStart = slotEnd;
  }

  return slots;
}
