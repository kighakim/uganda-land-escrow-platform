"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on the client side
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/login")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div>
        <p className="text-sm text-gray-500">Welcome back,</p>
        <p className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</p>
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{user.role}</p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium"
      >
        Logout
      </button>
    </div>
  );
}