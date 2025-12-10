"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // localStorage sirf client pe available hota hai
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        toast.error("Please login first!");
        return;
      }
      setToken(savedToken);
      fetchOrders(savedToken);
    }
  }, []);

  const fetchOrders = async (authToken) => {
    try {
      const res = await fetch("/api/orders/myorders", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data.orders);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  const cancelOrder = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/orders/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Order cancelled!");
        fetchOrders(token);
      } else {
        toast.error(data.error || "Cancel failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Cancel failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order._id} className="py-3 flex justify-between items-center">
            <span>
              Order #{order._id} - {order.status}
            </span>
            {order.status === "pending" && (
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={() => cancelOrder(order._id)}
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
