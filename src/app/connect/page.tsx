"use client"; // Ensures this component is only rendered on the client side

import React, { useEffect, useState } from "react";

// Define the interface for the booking data
interface Booking {
  starts_at: string; // Assuming the API returns an array of bookings with a `time` field
  ends_at: string;
  available_bookings: string;
}

export default function AvailableBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]); // State with Booking array

  // Fetch bookings data inside useEffect
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `/api/available-bookings?start=2024-10-01T04:00:00.000Z&end=2024-11-01T03:59:59.999Z`,
        );
        const data = await res.json();
        console.log(data);

        // Assuming that the data has a `bookings` property
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings(); // Call the fetch function
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      <h1>Available Bookings</h1>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>{booking.starts_at}</li> // Assuming booking has a `time` field
        ))}
      </ul>
    </div>
  );
}
