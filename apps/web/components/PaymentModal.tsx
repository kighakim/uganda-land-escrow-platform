"use client";

import { useState } from "react";

interface PaymentModalProps {
  transactionId: string;
  amount: number;
  titleNumber: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ transactionId, amount, titleNumber, onClose, onSuccess }: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [network, setNetwork] = useState("MTN");
  const [step, setStep] = useState<"input" | "processing" | "pin" | "success">("input");

  const handlePay = () => {
    if (!phoneNumber) return alert("Please enter a phone number");
    
    // Simulate sending USSD prompt to phone
    setStep("processing");
    setTimeout(() => {
      setStep("pin");
    }, 2000);
  };

  const handleConfirmPin = async () => {
    setStep("processing");
    try {
      // Call backend to actually lock the funds in the database
      const res = await fetch(`https://uganda-land-api.onrender.com/transactions/${transactionId}/lock-funds`, {
        method: "PATCH",
      });
      
      if (res.ok) {
        setTimeout(() => setStep("success"), 1500);
      } else {
        alert("Payment failed. Please try again.");
        setStep("pin");
      }
    } catch (err) {
      alert("Network error.");
      setStep("pin");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className={`p-6 text-white ${network === "MTN" ? "bg-yellow-400" : "bg-red-500"}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{network === "MTN" ? "MTN Mobile Money" : "Airtel Money"}</h3>
            {step !== "success" && <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>}
          </div>
          <p className="text-sm mt-1 opacity-90">Secure Escrow Payment</p>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === "input" && (
            <div className="space-y-4">
              <p className="text-gray-700 font-medium">Pay for <span className="text-blue-600">{titleNumber}</span></p>
              <p className="text-3xl font-bold text-gray-900">UGX {amount.toLocaleString()}</p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0771234567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setNetwork("MTN")}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${network === "MTN" ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-600"}`}
                >
                  MTN
                </button>
                <button
                  onClick={() => setNetwork("Airtel")}
                  className={`flex-1 py-3 rounded-lg font-bold transition ${network === "Airtel" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  Airtel
                </button>
              </div>

              <button
                onClick={handlePay}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-2"
              >
                Send Payment Request
              </button>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">
                {step === "processing" && (phoneNumber ? "Waiting for PIN on your phone..." : "Processing payment...")}
              </p>
            </div>
          )}

          {step === "pin" && (
            <div className="space-y-4 text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Enter your Mobile Money PIN to confirm payment of</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">UGX {amount.toLocaleString()}</p>
              </div>
              <input
                type="password"
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={handleConfirmPin}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
              >
                Confirm Payment
              </button>
              <button onClick={() => setStep("input")} className="text-gray-500 text-sm hover:underline">Cancel</button>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
              <p className="text-gray-600 mt-2">Funds are now locked in escrow.</p>
              <button
                onClick={onSuccess}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-6"
              >
                View Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
