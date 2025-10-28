
"use client";
import React, { useState, useEffect } from "react";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(120); // 2:00 = 120 seconds
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTimerDigits = () => {
    const m = String(Math.floor(timer / 60)).padStart(2, "0");
    const s = String(timer % 60).padStart(2, "0");
    return [...m, ...s]; // returns [m1, m2, s1, s2]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Payment processed (demo only)");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
  className="w-full max-w-xl p-10 rounded-lg shadow-md bg-white"
      >
        {/* Logo and Timer */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-4xl font-bold tracking-wide" style={{ color: '#7B3F3F', fontFamily: 'sans-serif' }}>
              NISALA <span className="text-base align-bottom font-normal">VILLA</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex space-x-1 mb-2">
              {formatTimerDigits().map((char, idx) => (
                idx === 2 ? [
                  <span key={"colon"} className="text-xl font-bold text-[#7B3F3F] mx-0.5 flex items-center justify-center">:</span>,
                  <span key={idx} className="w-8 h-8 bg-[#7B3F3F] text-white rounded text-xl flex items-center justify-center font-bold">{char}</span>
                ] : (
                  <span key={idx} className="w-8 h-8 bg-[#7B3F3F] text-white rounded text-xl flex items-center justify-center font-bold">{char}</span>
                )
              ))}
            </div>
            {/* <button type="button" className="text-xs text-[#7B3F3F] flex items-center gap-1"><span className="material-icons text-sm">edit</span>Edit</button> */}
          </div>
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-1">Card Number</label>
          <span className="block text-xs text-gray-500 mb-1">Enter the 16-digit card number on your card</span>
          <div className="flex items-center bg-gray-200 rounded">
            <input
              type="text"
              className="flex-1 bg-gray-200 px-4 py-2 rounded-l outline-none focus:ring-2 focus:ring-[#7B3F3F] focus:border-[#7B3F3F] text-center tracking-widest text-lg font-mono"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9- ]/g, ""))}
            //   
              maxLength={19}
              required
            />
            {/* <span className="px-3 text-gray-500 cursor-pointer"><span className="material-icons">settings</span></span> */}
          </div>
        </div>

        {/* CVV Number */}
        <div className="mb-4 flex items-center">
          <div className="flex-1 min-w-0">
            <label className="block text-lg font-bold mb-1">CVV Number</label>
            <span className="block text-xs text-gray-500 mb-1">Enter 3-4 digit number on the card</span>
          </div>
          <div className="flex items-center ml-0">
            <input
              type="text"
              className="flex-1 bg-gray-200 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-[#7B3F3F] focus:border-[#7B3F3F] text-lg text-center font-mono"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="CVV"
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Expiry Date */}
        <div className="mb-4 flex items-center">
          <div className="flex-1 min-w-0">
            <label className="block text-lg font-bold mb-1">Expiry Date</label>
            <span className="block text-xs text-gray-500 mb-1">Enter the expiration date on the card</span>
          </div>
          <div className="flex items-center ml-0 gap-2">
            <input
              type="text"
              className="w-14 bg-gray-200 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-[#7B3F3F] focus:border-[#7B3F3F] text-lg text-center font-mono"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value.replace(/[^0-9]/g, "").slice(0,2))}
              placeholder="MM"
              maxLength={2}
              required
            />
            <span className="text-xl font-bold">/</span>
            <input
              type="text"
              className="w-14 bg-[#7B3F3F] text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-[#7B3F3F] focus:border-[#7B3F3F] text-lg text-center font-mono"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value.replace(/[^0-9]/g, "").slice(0,2))}
              placeholder="YY"
              maxLength={2}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6 flex items-center">
          <div className="flex-1 min-w-0">
            <label className="block text-lg font-bold mb-1">Password</label>
            <span className="block text-xs text-gray-500 mb-1">Enter your dynamic password</span>
          </div>
          <div className="flex items-center ml-0">
            <input
              type="password"
              className="flex-1 bg-gray-200 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-[#7B3F3F] focus:border-[#7B3F3F] text-lg text-center font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#7B3F3F] text-white py-3 rounded font-semibold text-lg hover:bg-[#633232] transition"
        >
          Pay Now
        </button>
        {message && (
          <div className="mt-4 text-green-600 text-center">{message}</div>
        )}
      </form>
    </div>
  );
};

export default Payment;