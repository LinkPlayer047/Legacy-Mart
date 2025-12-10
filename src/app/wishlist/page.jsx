"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(null); // token ko state me store karenge

  useEffect(() => {
    // Client-side pe hi localStorage access hoga
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      fetchWishlist(storedToken);
    }
  }, []);

  const fetchWishlist = async (authToken) => {
    const res = await fetch("/api/wishlist", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = await res.json();
    if (res.ok) setWishlist(data.items);
  };

  const removeItem = async (id) => {
    if (!token) return toast.error("User not authenticated");

    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ itemId: id }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Removed from wishlist");
      fetchWishlist(token);
    } else toast.error(data.error || "Remove failed");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <ul className="divide-y divide-gray-200">
        {wishlist.map(item => (
          <li key={item._id} className="py-3 flex justify-between items-center">
            <span>{item.name}</span>
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
