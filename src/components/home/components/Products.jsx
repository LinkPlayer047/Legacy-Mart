"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Lato } from "next/font/google";
import { CiStar } from "react-icons/ci";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        // sirf 2 rows (5 cols x 2 rows = 10 products)
        setProducts(res.data.slice(0, 10));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div
      className={`bg-[#f5f7f9] flex flex-col items-center justify-center py-20 ${lato.className}`}
    >
      <h1 className="text-[32px] md:text-[42px] font-semibold text-black text-center">
        Featured Products
      </h1>
      <div className="border border-[#0084d6] w-[7%] mt-5 mb-10"></div>

      {/* PRODUCTS GRID */}
      <div className="mycontainer grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/singleproduct/${product._id}`}
            className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <div>
              <img
                src={product.images?.[0]?.url || "/placeholder.png"}
                alt={product.name}
                className="w-full h-56 object-cover rounded-md mb-3"
              />

              <h2 className="text-[16px] font-semibold text-black">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm">
                {product.category}
              </p>

              <h3 className="text-black font-bold">
                ₨ {product.price}
              </h3>

              <div className="flex text-black mt-1">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="mt-12">
        <Link
          href="/everything"
          className="bg-[#0084d6] text-white px-8 py-3 rounded hover:bg-[#0070b3] transition font-semibold"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Products;
