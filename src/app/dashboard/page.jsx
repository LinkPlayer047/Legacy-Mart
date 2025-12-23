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
  FiHeart,
  FiX,
} from "react-icons/fi";
import ProfileForm from "./components/ProfileForm";

const DashboardSummary = ({ totalOrders, pendingOrders, revenue, totalWishlist, totalCartItems, orders }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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

      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Wishlist Items</h3>
          <FiHeart className="text-2xl text-[#0075be]" />
        </div>
        <p className="text-2xl font-bold">{totalWishlist}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Cart Items</h3>
          <FiShoppingCart className="text-2xl text-[#0075be]" />
        </div>
        <p className="text-2xl font-bold">{totalCartItems}</p>
      </div>
    </div>

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
  </>
);

const OrdersPage = ({ orders }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
    <ul className="divide-y divide-gray-200">
      {orders.map((order) => (
        <li key={order._id} className="py-3 flex justify-between items-center">
          <span>Order #{order._id} - {order.status}</span>
          <button className="text-red-500 hover:underline">Cancel</button>
        </li>
      ))}
    </ul>
  </div>
);

const WishlistPage = ({ wishlist }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
    <ul className="divide-y divide-gray-200">
      {wishlist.map((item, idx) => (
        <li key={idx} className="py-3 flex justify-between items-center">
          <span>{item.name}</span>
          <button className="text-red-500 hover:underline">Remove</button>
        </li>
      ))}
    </ul>
  </div>
);

const CartPage = ({ cartItems }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

    {cartItems.length === 0 ? (
      <p>No items in cart</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li
            key={item.product._id}
            className="py-3 flex justify-between items-center"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>
              ₨ {item.product.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);


const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      router.push("/login");
    } else {
      fetchOrders(token);
      fetchWishlist(token);
      fetchCart(token);
      fetchUser(token); 
    }
  }
}, [router]);

const fetchUser = async (token) => {
  try {
    const res = await fetch("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data);
    } else {
      router.push("/login");
    }
  } catch (err) {
    console.error(err);
    router.push("/login");
  }
};


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

  const fetchWishlist = async (token) => {
    try {
      const res = await fetch("/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setWishlist(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCart = async (token) => {
  try {
    const res = await fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    console.log("🛒 CART API RESPONSE:", data);

    if (res.ok) {
      setCartItems(data.items);
    }
  } catch (err) {
    console.error("❌ Cart fetch error:", err);
  }
};


  if (!user) return null;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalWishlist = wishlist.length;
  const totalCartItems = cartItems.length;

  console.log("🧠 CART ITEMS STATE:", cartItems);

  return (
    <div className="flex pt-30 min-h-screen bg-gray-100 relative">
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col transition-transform z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#0075be]">Legacy Mart</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setActivePage("dashboard")}>
            <FiPieChart /> Dashboard
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setActivePage("orders")}>
            <FiShoppingCart /> Orders
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setActivePage("profile")}>
            <FiUser /> Profile
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setActivePage("wishlist")}>
            <FiHeart /> Wishlist
          </button>
          <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setActivePage("cart")}>
            <FiShoppingCart /> Cart
          </button>
        </nav>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("isLoggedIn", "false");
            }
            toast.success("Logged out successfully");
            router.push("/login");
          }}
          className="flex items-center gap-2 p-3 m-4 rounded bg-[#0075be] text-white hover:bg-[#005f93] transition"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-6 md:p-10 ml-0">
        <div className="flex items-center justify-between md:hidden mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <button
            className="bg-white p-2 rounded shadow"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {activePage === "dashboard" && (
          <DashboardSummary
            totalOrders={totalOrders}
            pendingOrders={pendingOrders}
            revenue={revenue}
            totalWishlist={totalWishlist}
            totalCartItems={totalCartItems}
            orders={orders}
          />
        )}
        {activePage === "orders" && <OrdersPage orders={orders} />}
        {activePage === "wishlist" && <WishlistPage wishlist={wishlist} />}
        {activePage === "cart" && <CartPage cartItems={cartItems} />}
        {activePage === "profile" && (
          <ProfileForm
            user={user}
            token={typeof window !== "undefined" ? localStorage.getItem("token") : ""}
            setUser={setUser}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
