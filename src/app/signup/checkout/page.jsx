"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items || []);
  const total = useSelector((state) => state.cart.totalPrice || 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      setToken(t);
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("User not logged in");

    try {
      const res = await axios.post(
        "/api/checkout",
        { shipping: formData, products: cartItems, totalAmount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push(`/order-success/${res.data.orderId}`);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="mycontainer py-20">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input name="name" placeholder="Full Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" required type="email" onChange={handleChange} />
        <input name="address" placeholder="Address" required onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="zip" placeholder="Zip Code" onChange={handleChange} />
        <button type="submit" className="bg-black text-white py-2 rounded mt-4">
          Place Order
        </button>
      </form>
    </div>
  );
}
