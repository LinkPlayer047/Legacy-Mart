"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      router.push("/login");
    } else {
      setToken(t);
      fetchCart(t);
    }
  }, [router]);

  const fetchCart = async (authToken) => {
    try {
      const { data } = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const items = Array.isArray(data.items) ? data.items : [];
      setCartItems(items);
      calculateTotal(items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      toast.error("Failed to load cart. Try again!");
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
      0
    );
    setTotal(totalPrice);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill all shipping fields");
      return;
    }

    try {
      const res = await axios.post(
        "/api/order",
        { shipping: form, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (paymentMethod === "cod") {
        toast.success("Order placed successfully!");
        router.push(`/order-success/${res.data.orderId}`);
      }

      if (paymentMethod === "online") {
  try {
    // 1️⃣ Call Stripe session API
    const stripeRes = await axios.post(
      "/api/payment/stripe",
      { orderId: res.data.orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2️⃣ Redirect to Stripe checkout page
    window.location.href = stripeRes.data.url;
  } catch (err) {
    console.error("Stripe payment failed:", err);
    toast.error("Stripe payment failed. Try again!");
  }
}
    } catch (err) {
      console.error("Order failed:", err);
      toast.error("Order failed. Try again!");
    }
  };

  return (
    <div className="mycontainer py-40 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Payment Method</h2>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="online"
            checked={paymentMethod === "online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Online Payment (Card)
        </label>
      </div>

      <div className="mb-6 border p-4 rounded bg-white">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between py-2 border-b last:border-none"
            >
              <span>{item.product.name} x {item.quantity}</span>
              <span>₨ {(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="flex justify-between mt-2 font-bold">
          <span>Total:</span>
          <span>₨ {total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-black text-white py-2 rounded hover:bg-[#0075c4] transition-colors"
      >
        {paymentMethod === "cod" ? "Place Order (COD)" : "Pay Online"}
      </button>
    </div>
  );
}
