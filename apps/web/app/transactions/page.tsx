"use client";

import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch("https://uganda-land-api.onrender.com/transactions");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        setError("Error loading data. Is backend running?");
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Active Escrows</h1>
            <p className="text-gray-600 mt-1">Track your land transactions in real-time.</p>
          </div>
          <a href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium">← Back to Listings</a>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Land Title</th>
                <th className="p-4 font-semibold text-gray-700">Amount (UGX)</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading transactions...</td></tr>
              ) : error ? (
                <tr><td colSpan={4} className="p-8 text-center text-red-500">{error}</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No active escrows found. Go initiate one!</td></tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900">{txn.listing.titleNumber}</td>
                    <td className="p-4 text-blue-600 font-bold">UGX {Number(txn.totalAmount).toLocaleString()}</td>
                    <td className="p-4"><span className="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full uppercase">{txn.status}</span></td>
                    <td className="p-4 text-gray-500 text-sm">{new Date(txn.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
