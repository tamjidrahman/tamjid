"use client"; // Ensures this component is only rendered on the client side

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TopNavBar } from "@/components/TopNavBar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
  const [topic, setTopic] = useState(""); // State for booking topic (optional)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null); // State for selected slot
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling the dialog visibility
  const [showSlots, setShowSlots] = useState(false); // State for controlling the slot transition

  // Fetch available slots data inside useEffect
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true); // Set loading to true before the request

      try {
        const res = await fetch(`/api/slots?year=2024&month=10`);
        const data: Slot[] = await res.json();

        // Extract the available dates from the slots
        const slotDates = data.map((slot) => {
          const startDate = new Date(slot.start);
          return startDate;
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

  // Handle selected date change
  useEffect(() => {
    if (selectedDate) {
      setShowSlots(false); // Hide slots before the transition
      setTimeout(() => {
        setShowSlots(true); // Show slots with transition
      }, 100); // Delay to create the transition effect
    }
  }, [selectedDate]);

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
    setSelectedSlot(slot);
    setDialogOpen(true); // Open the dialog
  };

  // Submit the booking
  const submitBooking = async () => {
    if (!name || !email || !selectedSlot) {
      alert("Name, email, and slot selection are required!");
      return;
    }

    const bookingData = {
      name,
      email,
      topic: topic || "No specific topic", // Optional topic input
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
      slot_date: new Date(selectedSlot.start).toISOString().split("T")[0], // Get the date part
      slot_start_time: new Date(selectedSlot.start).toLocaleTimeString([], {
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
    } finally {
      setDialogOpen(false); // Close the dialog
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
              <div
                className={`flex flex-col items-center gap-y-4 mt-8 transition-transform transform ${
                  showSlots
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0 blur-md"
                } duration-150 ease-in-out`}
              >
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

      {/* Booking Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="invisible">Open Booking</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">
              let&apos;s goooooo
            </DialogTitle>
            <DialogDescription>
              send the details below and confirm your booking
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-center">
            <Input
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="[optional] topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Button className="max-w-50" onClick={submitBooking}>
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
