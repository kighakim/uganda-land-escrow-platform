"use client";

import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function InitiateButton({ listingId, sellerId, priceUgx, titleNumber }: any) {
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleInitiate = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in first!");
      return;
    }
    const user = JSON.parse(storedUser);

    try {
      const res = await fetch("http://localhost:3000/transactions/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, sellerId, buyerId: user.id, totalAmount: priceUgx }),
      });

      if (res.ok) {
        const data = await res.json();
        setTransactionId(data.id);
        setShowModal(true);
      } else {
        alert("Failed to initiate escrow.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "success") {
    return <button className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg cursor-default">✅ Escrow Funded!</button>;
  }

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