"use client";
import React from "react";
import { useParams } from "next/navigation";
import products from "@/utiles/products"; // ✅ no curly braces if it's a default export
import Link from "next/link";

const Productreviews2 = () => {
  const { id } = useParams(); // get product ID from URL
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-20">Product not found 😕</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-16 flex flex-col lg:flex-row gap-10">
      {/* Left: Product Image */}
      <div className="lg:w-1/2 w-full">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Right: Details */}
      <div className="lg:w-1/2 w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.category}</p>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          ₨ {product.price}
        </h2>

        <p className="text-gray-700 mb-8 leading-relaxed">
          {product.description ||
            "This is a premium-quality product designed with excellent craftsmanship and attention to detail."}
        </p>

        <button className="bg-[#0084d6] text-white px-6 py-3 rounded hover:bg-[#0070b3] transition">
          Add to Cart
        </button>

        <div className="mt-8">
          <Link href="/everything" className="text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Productreviews2;
