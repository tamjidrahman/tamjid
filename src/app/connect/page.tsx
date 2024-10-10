"use client"; // Ensures this component is only rendered on the client side

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TopNavBar } from "@/components/TopNavBar";
import { Skeleton } from "@/components/ui/skeleton";

// Define the interface for the booking data
interface Booking {
  start: Date;
  end: Date;
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
  const [loading, setLoading] = useState(true); // Loading state
  const [name, setName] = useState(""); // State for user's name
  const [email, setEmail] = useState(""); // State for user's email
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // State for selected booking

  // Fetch bookings data inside useEffect
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true); // Set loading to true before the request

      try {
        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(today.getMonth() + 1);

        // Format the dates as ISO strings
        const start = today.toISOString(); // Today's date in ISO format
        const end = oneMonthLater.toISOString(); // One month later in ISO format

        const res = await fetch(
          `/api/available-bookings?start=${start}&end=${end}`,
        );
        const data = await res.json();

        // Group bookings by date and extract available dates
        const groupedBookings: GroupedBookings = data.reduce(
          (acc: GroupedBookings, booking_json: any) => {
            const startDate = new Date(booking_json.start).toDateString(); // Group by date string
            const booking: Booking = {
              start: new Date(booking_json.start),
              end: new Date(booking_json.end),
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
      } finally {
        setLoading(false); // Set loading to false after the request completes
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

  // Handle booking button click
  const handleBookingClick = (booking: Booking) => {
    const userName = prompt("Please enter your name:");
    const userEmail = prompt("Please enter your email:");

    if (userName && userEmail) {
      setName(userName);
      setEmail(userEmail);
      setSelectedBooking(booking);

      // Now call the function to submit the booking
      submitBooking(userName, userEmail, booking);
    } else {
      alert("Name and email are required to book!");
    }
  };

  // Submit the booking
  const submitBooking = async (
    name: string,
    email: string,
    booking: Booking,
  ) => {
    const bookingData = {
      _method: "post",
      name: name,
      email: email,
      start: booking.start.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
      bookings: [
        {
          start: booking.start.toISOString(),
          end: booking.end.toISOString(),
        },
      ],
      booking_questions: [],
      payment_id: null,
      paypal_order_id: null,
      stripe_confirmation_token: null,
      "g-recaptcha-response": "", // Add Recaptcha if needed
    };

    try {
      const response = await fetch("https://tidycal.com/bookings/1dz87zd", {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          "X-Requested-With": "XMLHttpRequest",
          "x-xsrf-token": "your-xsrf-token-here", // Ensure you have the correct token
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
          Let&apos;s Connect!
        </h1>

        {/* Show loading bar while fetching bookings */}
        {loading ? (
          <div className="flex justify-center">
            <div className="grid grid-cols-7 gap-1 p-2 h-[307px] w-[278px] rounded-md border">
              {/* Placeholder for the calendar header */}
              <div className="col-span-7 flex justify-center mb-2">
                <Skeleton className="h-5 w-20 rounded"></Skeleton>{" "}
                {/* Month and Year */}
              </div>

              {/* Placeholder for the weekdays row */}
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
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
                      onClick={() => handleBookingClick(booking)} // Handle click event
                    >
                      {booking.start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {booking.end.toLocaleTimeString([], {
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
