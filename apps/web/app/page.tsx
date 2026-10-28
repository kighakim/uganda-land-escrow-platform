"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [listings, setListings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState<"input" | "pin" | "success">("input");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    fetch("https://uganda-land-api.onrender.com/listings")
      .then((res) => res.json())
      .then((data) => setListings(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Backend not running?", err));
  }, []);

  const handleInitiateClick = (listing: any) => {
    if (!user) {
      window.location.href = "/login";
    } else {
      setSelectedListing(listing);
      setShowModal(true);
      setPaymentStep("input");
    }
  };

  const handlePay = () => {
    if (!phone) return alert("Enter a phone number");
    setPaymentStep("pin");
  };

  const handleConfirmPin = () => {
    setPaymentStep("success");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div>
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="text-xl font-bold text-gray-900">
              {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
            </p>
          </div>
          {user ? (
            <button 
              onClick={() => { localStorage.removeItem("user"); setUser(null); window.location.reload(); }}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100"
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign In</a>
          )}
        </div>

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">🇺🇬 Uganda Land Escrow</h1>
          <p className="text-gray-600 mt-2">Secure, transparent land transactions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{listing.titleNumber}</h2>
                <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full uppercase">
                  {listing.status}
                </span>
              </div>
              <div className="space-y-2 mb-6 text-gray-600">
                <p> {listing.tenureType} Tenure</p>
                <p>📐 {listing.sizeAcres} Acres</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-2xl font-extrabold text-blue-600">
                  UGX {Number(listing.priceUgx).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2 italic">"{listing.description}"</p>
                <button
                  onClick={() => handleInitiateClick(listing)}
                  className={`w-full mt-4 font-bold py-3 rounded-lg transition text-white ${
                    user ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"
                  }`}
                >
                  {user ? "🔒 Initiate Escrow" : "Sign in to initiate"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="bg-yellow-400 p-6 text-black">
                <h3 className="text-xl font-bold">MTN Mobile Money</h3>
                <p className="text-sm opacity-90">Secure Escrow Payment</p>
              </div>
              <div className="p-6">
                {paymentStep === "input" && (
                  <div className="space-y-4">
                    <p className="text-gray-700 font-medium">Pay for <span className="text-blue-600">{selectedListing.titleNumber}</span></p>
                    <p className="text-3xl font-bold text-gray-900">UGX {Number(selectedListing.priceUgx).toLocaleString()}</p>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0771234567" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    <button onClick={handlePay} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg">Send Payment Request</button>
                    <button onClick={() => setShowModal(false)} className="w-full text-gray-500 text-sm">Cancel</button>
                  </div>
                )}
                {paymentStep === "pin" && (
                  <div className="space-y-4 text-center">
                    <p className="text-gray-600">Enter PIN to confirm payment</p>
                    <input type="password" maxLength={4} placeholder="****" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest" />
                    <button onClick={handleConfirmPin} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg">Confirm Payment</button>
                  </div>
                )}
                {paymentStep === "success" && (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
                    <button onClick={() => setShowModal(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-6">Close</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}