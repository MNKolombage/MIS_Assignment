"use client";

import { useState, useEffect } from "react";
import PaymentForm from "./PaymentForm";
import { isVillaAvailable, addBooking } from "../../utils/bookings";

export default function BookYourStay() {
	const [showPaymentForm, setShowPaymentForm] = useState(false);
	const [randomImage, setRandomImage] = useState("");
	const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details
	const [formErrors, setFormErrors] = useState({}); // State to store form errors
	const [pricing, setPricing] = useState({ nights: 0, total: 0 }); // State to store pricing breakdown
	const [villaType, setVillaType] = useState("nisala-villa"); // State to track selected villa type
	const [checkIn, setCheckIn] = useState(""); // State for check-in date
	const [checkOut, setCheckOut] = useState(""); // State for check-out date

	// Map villa types to images
	const villaImages = {
		"nisala-villa": "/Gallery/img1.jpg",
		"nisala-suite": "/Gallery/img4.jpg",
	};

	// Randomly select a background image on the client side
	useEffect(() => {
		const images = ["/Gallery/img1.jpg", "/Gallery/img2.jpg", "/Gallery/img4.jpg"];
		setRandomImage(images[Math.floor(Math.random() * images.length)]);
	}, []);

	const calculatePricing = (checkIn, checkOut) => {
		const nightlyRate = 30; // Nightly rate
		const cleaningFee = 10;
		const serviceFee = 5;

		// Calculate the number of nights
		const checkInDate = new Date(checkIn);
		const checkOutDate = new Date(checkOut);
		const timeDiff = checkOutDate - checkInDate;
		const nights = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0); // Convert milliseconds to days

		// Calculate total
		const total = nights * nightlyRate + cleaningFee + serviceFee;

		return { nights, total };
	};

	// Update pricing dynamically when check-in or check-out dates change
	useEffect(() => {
		if (checkIn && checkOut) {
			const pricingDetails = calculatePricing(checkIn, checkOut);
			setPricing(pricingDetails);
		}
	}, [checkIn, checkOut]);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Form data
		const formData = {
			name: e.target.name.value,
			phone: e.target.phone.value,
			email: e.target.email.value,
			note: e.target.note.value,
			villaType: villaType, // Use the selected villa type
			adults: e.target.adults.value,
			children: e.target.children.value,
			checkIn: checkIn,
			checkOut: checkOut,
		};

		// Validate form data
		const errors = {};
		if (!formData.name) errors.name = "Name is required.";
		if (!formData.phone) errors.phone = "Phone number is required.";
		if (!formData.email) errors.email = "Email is required.";
		if (!formData.checkIn) errors.checkIn = "Check-in date is required.";
		if (!formData.checkOut) errors.checkOut = "Check-out date is required.";

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		 // Check villa availability
		if (!isVillaAvailable(villaType, checkIn, checkOut)) {
			setFormErrors({ availability: "The selected villa is not available for the chosen dates." });
			return;
		}

		// Clear errors and set booking details
		setFormErrors({});
		setBookingDetails({ ...formData, ...pricing });
		addBooking({ ...formData }); // Add the booking to the record
		setShowPaymentForm(true);
	};

	if (showPaymentForm) {
		return <PaymentForm bookingDetails={bookingDetails} />;
	}

	return (
		<section
			id="book_your_stay"
			className="py-12 bg-gray-50"
			style={{
				backgroundImage: `url(${randomImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "100vh",
			}}
		>
			{/* Header */}
			<header className="text-center mb-10 mt-20">
				<h1 className="text-5xl font-bold text-white" style={{ textShadow: "1px 1px 2px black" }}>
					We assist you to choose the best.
				</h1>
			</header>

			{/* Booking Form */}
			<form
				className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-lg space-y-6"
				onSubmit={handleSubmit}
			>
				{/* Row 1 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="Name..."
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
						{formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
					</div>
					<div>
						<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
							Phone Number
						</label>
						<input
							type="text"
							id="phone"
							placeholder="Phone Number..."
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
						{formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
					</div>
				</div>

				{/* Row 2 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							E-Mail Address
						</label>
						<input
							type="email"
							id="email"
							placeholder="E-Mail..."
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
						{formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
					</div>
					<div>
						<label htmlFor="note" className="block text-sm font-medium text-gray-700">
							Note
						</label>
						<input
							type="text"
							id="note"
							placeholder="Note..."
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
					</div>
				</div>

				{/* Row 3 */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div>
						<label htmlFor="villa-type" className="block text-sm font-medium text-gray-700">
							Select Villa Type *
						</label>
						<select
							id="villa-type"
							value={villaType}
							onChange={(e) => setVillaType(e.target.value)} // Update villa type on change
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						>
							<option value="nisala-villa">Nisala Villa</option>
							<option value="nisala-suite">Nisala Suite</option>
						</select>
					</div>
					<div>
						<label htmlFor="adults" className="block text-sm font-medium text-gray-700">
							Adult
						</label>
						<input
							type="number"
							id="adults"
							min="1"
							defaultValue="1"
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
					</div>
					<div>
						<label htmlFor="children" className="block text-sm font-medium text-gray-700">
							Children
						</label>
						<input
							type="number"
							id="children"
							min="0"
							defaultValue="0"
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
					</div>
				</div>

				{/* Row 4 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
							Check In Date
						</label>
						<input
							type="date"
							id="check-in"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)} // Update check-in date
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
						{formErrors.checkIn && <p className="text-red-500 text-sm">{formErrors.checkIn}</p>}
					</div>
					<div>
						<label htmlFor="check-out" className="block text-sm font-medium text-gray-700">
							Check Out Date
						</label>
						<input
							type="date"
							id="check-out"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)} // Update check-out date
							className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500"
						/>
						{formErrors.checkOut && <p className="text-red-500 text-sm">{formErrors.checkOut}</p>}
					</div>
				</div>

				{/* Availability Error */}
				{formErrors.availability && <p className="text-red-500 text-sm">{formErrors.availability}</p>}

				<button
					type="submit"
					className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 rounded-md shadow-md"
				>
					BOOK NOW
				</button>
			</form>
		</section>
	);
}
