const bookings = []; // Array to store booking records

// Function to check availability
export const isVillaAvailable = (villaType, checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  return !bookings.some((booking) => {
    if (booking.villaType === villaType) {
      const existingCheckIn = new Date(booking.checkIn);
      const existingCheckOut = new Date(booking.checkOut);

      // Check if the dates overlap
      return (
        (checkInDate >= existingCheckIn && checkInDate < existingCheckOut) ||
        (checkOutDate > existingCheckIn && checkOutDate <= existingCheckOut) ||
        (checkInDate <= existingCheckIn && checkOutDate >= existingCheckOut)
      );
    }
    return false;
  });
};

// Function to add a booking
export const addBooking = (booking) => {
  bookings.push(booking);
};
