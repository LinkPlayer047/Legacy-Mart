"use client"; // if you use Next.js 13 app directory and want client component
import React from "react";
import Link from "next/link";
import { Lato } from "next/font/google";
import { CiStar } from "react-icons/ci";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const productList = [
  {
    id: "dnk-yellow-shoes",
    image: "/shoe.jpg",
    name: "DNK Yellow Shoes",
    category: "Men",
    price: 100,
  },
  {
    id: "blue-sneakers",
    image: "/shoe2.jpg",
    name: "Blue Sneakers",
    category: "Men",
    price: 120,
  },
  {
    id: "women-jacket",
    image: "/3.jpg",
    name: "Women Jacket",
    category: "Women",
    price: 150,
  },
  {
    id: "leather-handbag",
    image: "/4.jpg",
    name: "Leather Handbag",
    category: "Accessories",
    price: 90,
  },
  {
    id: "casual-shirt",
    image: "/5.jpg",
    name: "Casual Shirt",
    category: "Men",
    price: 60,
  },
  {
    id: "stylish-heels",
    image: "/6.jpg",
    name: "Stylish Heels",
    category: "Women",
    price: 130,
  },
  {
    id: "denim-jeans",
    image: "/7.jpg",
    name: "Denim Jeans",
    category: "Men",
    price: 80,
  },
  {
    id: "summer-dress",
    image: "/8.jpg",
    name: "Summer Dress",
    category: "Women",
    price: 110,
  },
  {
    id: "wrist-watch",
    image: "/9.jpg",
    name: "Wrist Watch",
    category: "Accessories",
    price: 140,
  },
  {
    id: "running-shoes",
    image: "/10.jpg",
    name: "Running Shoes",
    category: "Unisex",
    price: 95,
  },
];

const Products = () => {
  return (
    <div
      className={`bg-[#f5f7f9] flex flex-col items-center justify-center py-20 ${lato.className}`}
    >
      <h1 className="text-[32px] md:text-[42px] font-semibold text-black text-center">
        Featured Products
      </h1>
      <div className="border border-[#0084d6] w-[7%] mt-5 mb-10"></div>

      <div className="mycontainer grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {productList.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            passHref
            className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-md mb-3"
              />
              <h2 className="text-[16px] font-semibold text-black">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <h3 className="text-black font-bold">${product.price}</h3>
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
    </div>
  );
};

export default Products;
