"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FiLogOut,
  FiShoppingCart,
  FiUser,
  FiPieChart,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      router.push("/login");
    } else {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
      fetchOrders(token);
    }
  }, []);

  const fetchOrders = async (token) => {
    try {
      const res = await fetch("/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="flex pt-30 min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col transition-transform z-40
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#0075be]">Legacy Mart</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiPieChart /> Dashboard
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiShoppingCart /> Orders
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiUser /> Profile
          </button>
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            router.push("/login");
          }}
          className="flex items-center gap-2 p-3 m-4 rounded bg-[#0075be] text-white hover:bg-[#005f93] transition"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Overlay for mobile blur */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64">
        {/* Mobile header with hamburger on right */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <button
            className="bg-white p-2 rounded shadow"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Desktop welcome */}
        <h1 className="hidden md:block text-3xl font-bold mb-6">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-700 mb-10">Email: {user.email}</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <FiShoppingCart className="text-2xl text-[#0075be]" />
            </div>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <FiPieChart className="text-2xl text-[#0075be]" />
            </div>
            <p className="text-2xl font-bold">₨ {revenue.toLocaleString()}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Orders</h3>
              <FiShoppingCart className="text-2xl text-[#0075be]" />
            </div>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <ul className="divide-y divide-gray-200">
            {orders
              .slice(-5)
              .reverse()
              .map((order) => (
                <li key={order._id} className="py-3 flex justify-between">
                  <span>
                    Order #{order._id} {order.status}
                  </span>
                  <span className="text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
