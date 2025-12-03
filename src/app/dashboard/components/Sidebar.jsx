"use client";
import React from "react";
import { FiLogOut, FiShoppingCart, FiUser, FiPieChart, FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Sidebar = ({ setSidebarOpen }) => {
  const router = useRouter();

  return (
    <aside className="fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col z-40">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0075be]">Legacy Mart</h2>
        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>X</button>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-2">
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <FiPieChart /> Dashboard
        </button>
        <button onClick={() => router.push("/orders")} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <FiShoppingCart /> Orders
        </button>
        <button onClick={() => router.push("/dashboard#profile")} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <FiUser /> Profile
        </button>
        <button onClick={() => router.push("/wishlist")} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <FiHeart /> Wishlist
        </button>
        <button onClick={() => router.push("/cart")} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <FiShoppingCart /> Cart
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
  );
};

export default Sidebar;
