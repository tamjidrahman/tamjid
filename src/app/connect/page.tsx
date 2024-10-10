"use client"; // Ensures this component is only rendered on the client side

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TopNavBar } from "@/components/TopNavBar";

// Define the interface for the booking data
interface Booking {
  starts_at: Date;
  ends_at: Date;
  available_bookings: number;
}

// Group bookings by date
interface GroupedBookings {
  [date: string]: Booking[];
}

export default function AvailableBookings() {
  const [bookings, setBookings] = useState<GroupedBookings>({}); // State with grouped bookings by date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  ); // Selected date for showing booking times
  const [availableDates, setAvailableDates] = useState<Date[]>([]); // Dates with available bookings

  // Fetch bookings data inside useEffect
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `/api/available-bookings?start=2024-10-01T04:00:00.000Z&end=2024-11-01T03:59:59.999Z`,
        );
        const data = await res.json();

        // Group bookings by date and extract available dates
        const groupedBookings: GroupedBookings = data.reduce(
          (acc: GroupedBookings, booking_json: any) => {
            const startDate = new Date(booking_json.starts_at).toDateString(); // Group by date string
            const booking: Booking = {
              starts_at: new Date(booking_json.starts_at),
              ends_at: new Date(booking_json.ends_at),
              available_bookings: booking_json.available_bookings,
            };
            if (!acc[startDate]) {
              acc[startDate] = [];
            }
            acc[startDate].push(booking);
            return acc;
          },
          {},
        );

        setBookings(groupedBookings || {});

        // Extract available dates from grouped bookings
        const availableDatesArray = Object.keys(groupedBookings).map(
          (dateString) => new Date(dateString),
        );
        setAvailableDates(availableDatesArray);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings(); // Call the fetch function
  }, []); // Empty dependency array means it runs once on mount

  // Get bookings for the selected date
  const getBookingsForSelectedDate = () => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toDateString();
      return bookings[selectedDateString] || [];
    }
    return [];
  };
  console.log(availableDates);

  return (
    <>
      <div className="flex justify-center mt-10 my-10">
        <TopNavBar />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-4xl text-primary text-center">
          {" "}
          Let&apos;s Connect!
        </h1>

        {/* Calendar Component */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          // Disable dates that are not in the available dates array
          disabled={[
            {
              before: availableDates[0],
              after: availableDates[availableDates.length - 1],
            },
            (date) =>
              !availableDates.some(
                (availableDate) =>
                  availableDate.toDateString() === date.toDateString(),
              ),
          ]}
        />

        {/* Display Booking Times for the Selected Date */}
        {selectedDate && (
          <div className="flex flex-col items-center gap-y-4 mt-8">
            <h2 className="text-center">
              {getBookingsForSelectedDate().length === 0
                ? `No times available for ${selectedDate.toDateString()}`
                : `Available Bookings for ${selectedDate.toDateString()}`}
            </h2>
            <div className="flex flex-col gap-4 max-w-fit">
              {getBookingsForSelectedDate().map((booking, index) => (
                <Button
                  key={index}
                  className="booking-button"
                  variant="secondary"
                >
                  {booking.starts_at.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {booking.ends_at.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
