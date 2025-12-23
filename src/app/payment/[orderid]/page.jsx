"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function PaymentPage() {
  const router = useRouter();
  const { orderId } = useParams();

  useEffect(() => {
    const startPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");

        const res = await axios.post(
          "/api/payment/stripe",
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Redirect to Stripe
        window.location.href = res.data.url;
      } catch (err) {
        alert("Payment initiation failed");
        router.push("/checkout");
      }
    };

    startPayment();
  }, [orderId, router]);

  return (
    <div className="py-40 text-center">
      <h1 className="text-xl font-semibold">
        Redirecting to secure payment...
      </h1>
    </div>
  );
}
