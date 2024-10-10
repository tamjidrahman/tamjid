"use client"; // Ensures this component is only rendered on the client side

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TopNavBar } from "@/components/TopNavBar";
import { Skeleton } from "@/components/ui/skeleton";

// Define the interface for the slot data
interface Slot {
  start: string; // ISO date-time string
  end: string; // ISO date-time string
}

export default function AvailableBookings() {
  const [slots, setSlots] = useState<Slot[]>([]); // State with a flat list of available slots
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  ); // Selected date for showing booking times
  const [availableDates, setAvailableDates] = useState<Date[]>([]); // Dates with available slots
  const [loading, setLoading] = useState(true); // Loading state
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState(""); // State for user's email

  // Fetch available slots data inside useEffect
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true); // Set loading to true before the request

      try {
        const res = await fetch(
          `/api/slots?time_zone=America/New_York&year=2024&month=10`,
        );
        const data: Slot[] = await res.json();

        // Extract the available dates from the slots
        const slotDates = data.map((slot) => {
          const startDate = new Date(slot.start);
          return startDate; // Ensure the value passed to new Date is valid
        });

        // Set available dates and slots
        const uniqueDates = Array.from(
          new Set(slotDates.map((d: Date) => d.toDateString())),
        ).map((dateString: string) => new Date(dateString));

        setAvailableDates(uniqueDates);
        setSlots(data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchSlots(); // Call the fetch function
  }, []); // Empty dependency array means it runs once on mount

  // Get bookings (slots) for the selected date
  const getSlotsForSelectedDate = () => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toDateString();
      return slots.filter((slot) => {
        const slotDate = new Date(slot.start).toDateString();
        return slotDate === selectedDateString;
      });
    }
    return [];
  };

  // Handle booking button click
  const handleBookingClick = (slot: Slot) => {
    const userName = prompt("Please enter your name:");
    const userEmail = prompt("Please enter your email:");

    if (userName && userEmail) {
      setName(userName);
      setEmail(userEmail);

      // Now call the function to submit the booking to the /booking API
      submitBooking(userName, userEmail, slot);
    } else {
      alert("Name and email are required to book!");
    }
  };

  // Submit the booking
  const submitBooking = async (name: string, email: string, slot: Slot) => {
    const bookingData = {
      name: name,
      email: email,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
      slot_date: new Date(slot.start).toISOString().split("T")[0], // Get the date part
      slot_start_time: new Date(slot.start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      form_responses: {}, // Optional form responses
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking successfully submitted!");
      } else {
        console.error("Booking submission failed", result);
        alert("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking", error);
      alert("An error occurred while submitting the booking.");
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10 my-10">
        <TopNavBar />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-4xl text-primary text-center">
          {" "}
          Let&apos;s Connect!{" "}
        </h1>

        {/* Show loading bar while fetching slots */}
        {loading ? (
          <div className="flex justify-center">
            <div className="grid grid-cols-7 gap-1 p-2 h-[307px] w-[278px] rounded-md border">
              {/* Placeholder for the calendar header */}
              <div className="col-span-7 flex justify-center mb-2">
                <Skeleton className="h-5 w-20 rounded"></Skeleton>{" "}
                {/* Month and Year */}
              </div>

              {/* Placeholder for the weekdays row */}
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((_day, index) => (
                <div key={index} className="flex justify-center text-sm">
                  <Skeleton className="h-4 w-4 rounded-full"></Skeleton>
                </div>
              ))}

              {/* Placeholder for the days (28-31 days) */}
              {Array.from({ length: 35 }).map((_, index) => (
                <div key={index} className="flex justify-center">
                  <Skeleton className="h-6 w-6 rounded-full"></Skeleton>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
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
                  {getSlotsForSelectedDate().length === 0
                    ? `No times available for ${selectedDate.toDateString()}`
                    : `Available Slots for ${selectedDate.toDateString()}`}
                </h2>
                <div className="flex flex-col gap-4 max-w-fit">
                  {getSlotsForSelectedDate().map((slot, index) => (
                    <Button
                      key={index}
                      className="booking-button"
                      variant="secondary"
                      onClick={() => handleBookingClick(slot)} // Handle click event
                    >
                      {new Date(slot.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      })}{" "}
                      -{" "}
                      {new Date(slot.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      })}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
