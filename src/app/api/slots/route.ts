import { NextResponse } from "next/server";
import { DateTime } from "luxon";

// Define the interface for the new slot data structure
interface SlotData {
  date: string;
  slots: {
    [key: string]: {
      start_time: string;
      end_time: string;
      is_available: boolean;
    };
  };
}

interface TimeSlot {
  start: string;
  end: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeZone = "UTC";
  const year = searchParams.get("year") || new Date().getFullYear().toString();
  const month =
    searchParams.get("month") || (new Date().getMonth() + 1).toString(); // Default to current month

  try {
    // Call the new API to get available slots
    const response = await fetch(
      `https://tamjid.neetocal.com/api/external/v1/slots/connect?time_zone=${timeZone}&year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.NEETO_API_KEY as string, // Ensure this API key is stored securely in your environment variables
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch available slots");
    }

    const data = await response.json();

    // Process the response data and return a flat list of available slots
    const freeSlots: TimeSlot[] = extractAvailableSlots(data.slots, timeZone);

    return NextResponse.json(freeSlots);
  } catch (error) {
    console.error("Failed to fetch calendar free/busy data:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar free/busy data." },
      { status: 500 },
    );
  }
}

function toISOWithTimeZone(dateTimeString: string, timeZone: string): string {
  return DateTime.fromISO(dateTimeString, { zone: timeZone }).toISO() || "";
}
// Function to extract available time slots from the API response as a flat list
function extractAvailableSlots(
  slotsData: SlotData[],
  timeZone: string,
): TimeSlot[] {
  const freeSlots: TimeSlot[] = [];

  for (const day of slotsData) {
    const slotEntries = Object.entries(day.slots);

    for (const [_, slot] of slotEntries) {
      if (slot.is_available) {
        const startISO = toISOWithTimeZone(
          `${day.date}T${convertTo24Hour(slot.start_time)}`,
          timeZone,
        );
        const endISO = toISOWithTimeZone(
          `${day.date}T${convertTo24Hour(slot.end_time)}`,
          timeZone,
        );

        freeSlots.push({
          start: startISO,
          end: endISO,
        });
      }
    }
  }

  return freeSlots;
}

// Helper function to convert 12-hour format to 24-hour format
function convertTo24Hour(time: string): string {
  const [timePart, modifier] = time.split(" "); // e.g. ["09:00", "AM"]
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Ensure the result is in HH:MM format
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:00`; // Return as HH:MM:SS
}
