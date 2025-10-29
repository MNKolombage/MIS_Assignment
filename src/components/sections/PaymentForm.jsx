import React, { useState } from "react";

export default function PaymentForm({ bookingDetails }) {
	const [paymentMethod, setPaymentMethod] = useState("card");
	const [villaType, setVillaType] = useState(bookingDetails.villaType); // Use villa type from booking details
	const [formData, setFormData] = useState({
		cardholderName: "",
		cardNumber: "",
		expiryDate: "",
		cvc: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [showReceipt, setShowReceipt] = useState(false);

	// Map villa types to images
	const villaImages = {
		"nisala-villa": "/Gallery/img1.jpg",
		"nisala-suite": "/Gallery/img4.jpg",
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const validateForm = () => {
		const errors = {};
		if (!formData.cardholderName) errors.cardholderName = "Cardholder's name is required.";
		if (!formData.cardNumber) errors.cardNumber = "Card number is required.";
		if (!formData.expiryDate) errors.expiryDate = "Expiry date is required.";
		if (!formData.cvc) errors.cvc = "CVC is required.";
		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}
		setFormErrors({});
		setShowReceipt(true); // Show receipt and hide payment form
	};

	return (
		<section
			className="py-12 bg-gray-50"
			style={{
				backgroundImage: `url(${villaImages[villaType]})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: "100vh",
			}}
		>
			{/* Header */}
			<header className="text-center mb-10 mt-20">
				<h1 className="text-5xl font-bold text-white" style={{ textShadow: "1px 1px 2px black" }}>
					How would you like to pay?
				</h1>
			</header>

			{/* Booking Details */}
			<div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-lg mb-6 flex gap-6">
				{/* Image */}
				<div className="w-1/3">
					<img
						src={villaImages[villaType]} // Dynamically update the image
						alt="Booking Preview"
						className="rounded-lg shadow-md w-full h-auto"
					/>
				</div>

				{/* Details */}
				<div className="w-2/3">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">Your Booking Details</h2>
					<div className="space-y-2">
						<p className="text-gray-700">
							<strong>Name:</strong> {bookingDetails.name}
						</p>
						<p className="text-gray-700">
							<strong>Phone:</strong> {bookingDetails.phone}
						</p>
						<p className="text-gray-700">
							<strong>Email:</strong> {bookingDetails.email}
						</p>
						<p className="text-gray-700">
							<strong>Check-In:</strong> {bookingDetails.checkIn}
						</p>
						<p className="text-gray-700">
							<strong>Check-Out:</strong> {bookingDetails.checkOut}
						</p>
						<p className="text-gray-700">
							<strong>Guests:</strong> {bookingDetails.adults} Adults, {bookingDetails.children} Children
						</p>
						<p className="text-gray-700">
							<strong>Villa Type:</strong> {bookingDetails.villaType === "nisala-villa" ? "Nisala Villa" : "Nisala Suite"}
						</p>
					</div>
					<hr className="my-4" />
					<h3 className="text-lg font-semibold text-gray-800">Pricing Breakdown</h3>
					<div className="space-y-2">
						<p className="text-gray-700">
							${30} X {bookingDetails.nights} nights: <strong>${bookingDetails.nights * 30}</strong>
						</p>
						<p className="text-gray-700">Cleaning Fee: <strong>$10</strong></p>
						<p className="text-gray-700">Service Fee: <strong>$5</strong></p>
						<hr className="my-2" />
						<p className="text-gray-700 font-bold">Total before taxes: <strong>${bookingDetails.total}</strong></p>
					</div>
				</div>
			</div>

			{/* Payment Form or Receipt */}
			<div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-lg space-y-6">
				{!showReceipt ? (
					<>
						{/* Payment Methods */}
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-800">Select Payment Method</h2>
							<div className="flex space-x-4">
								<button
									type="button"
									className={`flex-1 p-3 border rounded-md ${
										paymentMethod === "card" ? "border-blue-500" : "border-gray-300"
									}`}
									onClick={() => setPaymentMethod("card")}
								>
									Credit/Debit Card
								</button>
								<button
									type="button"
									className={`flex-1 p-3 border rounded-md ${
										paymentMethod === "paypal" ? "border-blue-500" : "border-gray-300"
									}`}
									onClick={() => setPaymentMethod("paypal")}
								>
									PayPal
								</button>
								<button
									type="button"
									className={`flex-1 p-3 border rounded-md ${
										paymentMethod === "googlepay" ? "border-blue-500" : "border-gray-300"
									}`}
									onClick={() => setPaymentMethod("googlepay")}
								>
									Google Pay
								</button>
							</div>
						</div>

						{/* Payment Form or Placeholder */}
						{paymentMethod === "card" && (
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div>
									<label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
										Cardholder's name *
									</label>
									<input
										type="text"
										id="cardholderName"
										value={formData.cardholderName}
										onChange={handleInputChange}
										placeholder="Cardholder's name..."
										className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
										required
									/>
									{formErrors.cardholderName && <p className="text-red-500 text-sm">{formErrors.cardholderName}</p>}
								</div>
								<div>
									<label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
										Card number *
									</label>
									<input
										type="text"
										id="cardNumber"
										value={formData.cardNumber}
										onChange={handleInputChange}
										placeholder="Card number..."
										className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
										required
									/>
									{formErrors.cardNumber && <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>}
								</div>
								<div className="grid grid-cols-2 gap-6">
									<div>
										<label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
											Expiry date *
										</label>
										<input
											type="text"
											id="expiryDate"
											value={formData.expiryDate}
											onChange={handleInputChange}
											placeholder="MM / YY"
											className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
											required
										/>
										{formErrors.expiryDate && <p className="text-red-500 text-sm">{formErrors.expiryDate}</p>}
									</div>
									<div>
										<label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
											CVC *
										</label>
										<input
											type="text"
											id="cvc"
											value={formData.cvc}
											onChange={handleInputChange}
											placeholder="CVC"
											className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
											required
										/>
										{formErrors.cvc && <p className="text-red-500 text-sm">{formErrors.cvc}</p>}
									</div>
								</div>
								<button
									type="submit"
									className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 rounded-md shadow-md"
								>
									Pay Now
								</button>
							</form>
						)}

						{paymentMethod === "paypal" && (
							<div className="text-center mt-6">
								<p className="text-gray-700">You will be redirected to PayPal to complete your payment.</p>
								<button
									type="button"
									className="mt-4 bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-6 rounded-md shadow-md"
									onClick={() => alert("Redirecting to PayPal...")} // Replace with actual PayPal integration
								>
									Proceed to PayPal
								</button>
							</div>
						)}

						{paymentMethod === "googlepay" && (
							<div className="text-center mt-6">
								<p className="text-gray-700">You will be redirected to Google Pay to complete your payment.</p>
								<button
									type="button"
									className="mt-4 bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-6 rounded-md shadow-md"
									onClick={() => alert("Redirecting to Google Pay...")} // Replace with actual Google Pay integration
								>
									Proceed to Google Pay
								</button>
							</div>
						)}
					</>
				) : (
					<div className="mt-8 bg-gray-100 p-6 rounded-md shadow-md">
						<h1 className="text-2xl font-bold text-center mb-4">Payment Receipt</h1>
						<p className="text-gray-700">
							<strong>Name:</strong> {bookingDetails.name}
						</p>
						<p className="text-gray-700">
							<strong>Email:</strong> {bookingDetails.email}
						</p>
						<p className="text-gray-700">
							<strong>Total Paid:</strong> ${bookingDetails.total}
						</p>
						<p className="text-gray-700 mt-4">
							A confirmation email has been sent to <strong>{bookingDetails.email}</strong>.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
