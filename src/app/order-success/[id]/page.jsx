"use client";
import { useParams } from "next/navigation";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="mycontainer py-40 text-center">
      <h1 className="text-3xl font-bold mb-4">Order Placed 🎉</h1>
      <p>Your Order ID:</p>
      <p className="font-semibold mt-2">{id}</p>
    </div>
  );
}
