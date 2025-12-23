"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const total = useSelector((state) => state.cart.totalPrice);

  const [token, setToken] = useState("");
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
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "/api/order",
        {
          shipping: form,
          paymentMethod, // 👈 IMPORTANT
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // COD → direct success
      if (paymentMethod === "cod") {
        router.push(`/order-success/${res.data.orderId}`);
      }

      // ONLINE → Stripe page
      if (paymentMethod === "online") {
        router.push(`/payment/${res.data.orderId}`);
      }
    } catch (err) {
      alert("Order failed");
      console.error(err);
    }
  };

  return (
    <div className="mycontainer py-40 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Shipping Form */}
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      {/* Payment Method */}
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

      {/* Total */}
      <div className="flex justify-between mb-6">
        <span>Total:</span>
        <strong>₨ {total}</strong>
      </div>

      {/* Button */}
      <button
        onClick={placeOrder}
        className="w-full bg-black text-white py-2 rounded"
      >
        {paymentMethod === "cod" ? "Place Order (COD)" : "Pay Online"}
      </button>
    </div>
  );
}
