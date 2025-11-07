import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Aproducts2 = () => {
  return (
    <div className="bg-[#f5f7f9] py-20">
      <div
        className={`max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-start justify-between gap-10 px-5 ${lato.className}`}
      >
        {/* ================= LEFT SIDE FILTER SECTION ================= */}
        <div className="lg:w-[30%] w-full bg-white rounded-lg shadow-md p-6">
          {/* Search Bar */}
          <div className="flex items-center w-full border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 outline-none"
            />
            <Link href="/everything">
              <button className="bg-[#0084d6] text-white px-3 py-2 hover:bg-[#0070b3]">
                <IoIosArrowForward className="text-lg" />
              </button>
            </Link>
          </div>

          {/* Price Filter */}
          <div className="pt-10 w-full">
            <h2 className="text-[22px] mb-4 text-gray-800">Filter by Price</h2>
            <div className="relative w-full h-1 bg-gray-300 rounded-full">
              <div className="absolute top-0 left-[20%] right-[30%] h-1 bg-[#0084d6] rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-4 h-4 bg-[#0084d6] rounded-full border-2 border-white shadow"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-4 h-4 bg-[#0084d6] rounded-full border-2 border-white shadow"></div>
            </div>
            <div className="flex justify-between mt-6 text-gray-700 font-medium">
              <span>₨ 500</span>
              <span>₨ 5000</span>
            </div>
            <button className="mt-5 w-full bg-[#0084d6] text-white py-2 rounded hover:bg-[#0070b3] transition">
              Apply Filter
            </button>
          </div>

          {/* Category Section */}
          <div className="pt-10">
            <h1 className="text-[22px] mb-4 font-semibold text-gray-800">
              Categories
            </h1>

            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/accessories"
                  className="flex items-center justify-between text-[16px] hover:text-[#0084d6] cursor-pointer border-b border-gray-200 pb-2 transition"
                >
                  <span>Accessories</span>
                  <span className="text-gray-500">(4)</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/men"
                  className="flex items-center justify-between text-[16px] hover:text-[#0084d6] cursor-pointer border-b border-gray-200 pb-2 transition"
                >
                  <span>Men</span>
                  <span className="text-gray-500">(4)</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/women"
                  className="flex items-center justify-between text-[16px] hover:text-[#0084d6] cursor-pointer border-b border-gray-200 pb-2 transition"
                >
                  <span>Women</span>
                  <span className="text-gray-500">(4)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= RIGHT SIDE PRODUCTS SECTION ================= */}
        <div className="lg:w-[70%] w-full">
          <h2 className="text-[26px] font-semibold mb-6 text-gray-900">
            Accessories
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 4 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative w-full h-64">
                <img src="/17.jpg" alt="" className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-[16px] font-semibold text-gray-800 mb-2">
                  Bright Gold Purse With Chain
                </h3>
                <p className="text-gray-500 mb-2">Accessories</p>
                <h4 className="text-[#0084d6] font-bold text-[18px] mb-3">
                  ₨ 1,600
                </h4>
                <button className="bg-[#0084d6] text-white px-5 py-2 rounded hover:bg-[#0070b3] transition">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product 5 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative w-full h-64">
                <img src="/7.jpg" alt="" className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-[16px] font-semibold text-gray-800 mb-2">
                  Anchore Bracelet
                </h3>
                <p className="text-gray-500 mb-2">Accessories</p>
                <h4 className="text-[#0084d6] font-bold text-[18px] mb-3">
                  ₨ 1,800
                </h4>
                <button className="bg-[#0084d6] text-white px-5 py-2 rounded hover:bg-[#0070b3] transition">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product 6 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative w-full h-64">
                <img src="/8.jpg" alt="" className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-[16px] font-semibold text-gray-800 mb-2">
                  BOHO Bangle Bracelet
                </h3>
                <p className="text-gray-500 mb-2">Accessories</p>
                <h4 className="text-[#0084d6] font-bold text-[18px] mb-3">
                  ₨ 2,000
                </h4>
                <button className="bg-[#0084d6] text-white px-5 py-2 rounded hover:bg-[#0070b3] transition">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Product 10 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative w-full h-64">
                <img src="/12.jpg" alt="" className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-[16px] font-semibold text-gray-800 mb-2">
                  BUDHHA Bracelet
                </h3>
                <p className="text-gray-500 mb-2">Accessories</p>
                <h4 className="text-[#0084d6] font-bold text-[18px] mb-3">
                  ₨ 2,000
                </h4>
                <button className="bg-[#0084d6] text-white px-5 py-2 rounded hover:bg-[#0070b3] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aproducts2;
