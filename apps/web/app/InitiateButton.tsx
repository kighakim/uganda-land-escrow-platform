"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function PaymentModal({
  transactionId,
  amount,
  titleNumber,
  onClose,
  onSuccess,
}: {
  transactionId: string;
  amount: number;
  titleNumber: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Complete your escrow payment</h2>
        <p className="mt-3">Title: {titleNumber}</p>
        <p>Amount: UGX {amount.toLocaleString()}</p>
        <p className="mt-2 text-sm text-gray-600">Transaction: {transactionId}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded px-4 py-2 text-gray-700 hover:bg-gray-100">
            Close
          </button>
          <button onClick={onSuccess} className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            I completed payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InitiateButton({ listingId, sellerId, priceUgx, titleNumber }: any) {
  const [user, setUser] = useState<any>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("idle");

  // Check if user is logged in when the page loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInitiate = async () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/transactions/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, sellerId, buyerId: user.id, totalAmount: priceUgx }),
      });

      if (res.ok) {
        const data = await res.json();
        setTransactionId(data.id);
        setShowModal(true); // This opens the beautiful MTN popup!
      } else {
        alert("Failed to initiate escrow.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // If NOT logged in, show a button that links to the login page
  if (!user) {
    return (
      <Link href="/login">
        <button className="w-full mt-4 bg-gray-400 text-white font-bold py-3 rounded-lg cursor-pointer hover:bg-gray-500 transition">
          Sign in to initiate
        </button>
      </Link>
    );
  }

  // If logged in and payment was successful
  if (status === "success") {
    return <button className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg cursor-default">✅ Escrow Funded!</button>;
  }

  // If logged in, show the real Initiate button
  return (
    <>
      <button onClick={handleInitiate} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
        🔒 Initiate Escrow
      </button>

      {showModal && transactionId && (
        <PaymentModal
          transactionId={transactionId}
          amount={priceUgx}
          titleNumber={titleNumber}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setStatus("success");
          }}
        />
      )}
    </>
  );
}