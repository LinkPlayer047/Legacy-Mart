"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Productlist2 from "@/components/everything/components/Productlist2";
import products from "@/utiles/products";

export default function CategoryPage() {
  const { slug } = useParams(); // 'women', 'men', etc.

  // Filter products by category slug
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => p.category.toLowerCase() === slug.toLowerCase()
    );
  }, [slug]);

  if (filteredProducts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <h1 className="text-3xl font-semibold mb-3 capitalize">{slug}</h1>
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Reuse Shop layout */}
      <Productlist2 products={filteredProducts} pageTitle={`${slug} Collection`} />
    </div>
  );
}
