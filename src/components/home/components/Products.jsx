import React from "react";
import { Lato } from "next/font/google";
import { CiStar } from "react-icons/ci";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

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
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/shoe.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">
            DNK Yellow Shoes
          </h2>
          <p className="text-gray-500 text-sm">Men</p>
          <h3 className="text-black font-bold">$100</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/shoe2.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">
            Blue Sneakers
          </h2>
          <p className="text-gray-500 text-sm">Men</p>
          <h3 className="text-black font-bold">$120</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/3.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">Women Jacket</h2>
          <p className="text-gray-500 text-sm">Women</p>
          <h3 className="text-black font-bold">$150</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/4.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">
            Leather Handbag
          </h2>
          <p className="text-gray-500 text-sm">Accessories</p>
          <h3 className="text-black font-bold">$90</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/5.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">Casual Shirt</h2>
          <p className="text-gray-500 text-sm">Men</p>
          <h3 className="text-black font-bold">$60</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/6.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">
            Stylish Heels
          </h2>
          <p className="text-gray-500 text-sm">Women</p>
          <h3 className="text-black font-bold">$130</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/7.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">Denim Jeans</h2>
          <p className="text-gray-500 text-sm">Men</p>
          <h3 className="text-black font-bold">$80</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/8.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">Summer Dress</h2>
          <p className="text-gray-500 text-sm">Women</p>
          <h3 className="text-black font-bold">$110</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/9.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">Wrist Watch</h2>
          <p className="text-gray-500 text-sm">Accessories</p>
          <h3 className="text-black font-bold">$140</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition duration-300">
          <img
            src="/10.jpg"
            alt=""
            className="w-full h-56 object-cover rounded-md mb-3"
          />
          <h2 className="text-[16px] font-semibold text-black">
            Running Shoes
          </h2>
          <p className="text-gray-500 text-sm">Unisex</p>
          <h3 className="text-black font-bold">$95</h3>
          <div className="flex text-black mt-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
