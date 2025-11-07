import React from "react";
import { Lato } from "next/font/google";
import Link from "next/link";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Footer = () => {
  return (
    <div>
      {/* Top Section */}
      <div className="bg-[#FFFFFF] border-b border-gray-200 pt-10">
        <div className="mycontainer2 py-10 grid grid-cols-2 md:grid-cols-4 gap-10 items-start">
          
          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h1 className={`${lato.className} font-bold text-[20px]`}>
              Quick Links
            </h1>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Home</Link>
            <Link href="/about" className="text-[16px] font-semibold hover:text-blue-700">About</Link>
            <Link href="/login" className="text-[16px] font-semibold hover:text-blue-700">My Account</Link>
            <Link href="/cart" className="text-[16px] font-semibold hover:text-blue-700">Cart</Link>
            <Link href="/contact" className="text-[16px] font-semibold hover:text-blue-700">Contact</Link>
          </div>

          {/* For Her */}
          <div className="flex flex-col gap-3">
            <h1 className={`${lato.className} font-bold text-[20px]`}>
              For Her
            </h1>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Women Jeans</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Tops and Shirts</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Women Jackets</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Heels and Flats</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Women Accessories</Link>
          </div>

          {/* For Him */}
          <div className="flex flex-col gap-3">
            <h1 className={`${lato.className} font-bold text-[20px]`}>
              For Him
            </h1>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Jeans</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Shirts</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Shoes</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Accessories</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Jackets</Link>
          </div>

          {/* Extras */}
          <div className="flex flex-col gap-3">
            <h1 className={`${lato.className} font-bold text-[20px]`}>
              Extras
            </h1>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Home</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Shirts</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Shoes</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Accessories</Link>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Men Jackets</Link>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="mycontainer2 flex flex-col md:flex-row items-center justify-between py-5 mt-10">
        <h2 className="text-gray-600 text-sm md:text-base">
          © 2025 Legacy Mart. All rights reserved.
        </h2>
        <h2 className="text-gray-600 text-sm md:text-base mt-2 md:mt-0">
          Powered by GMS
        </h2>
      </div>
    </div>
  );
};

export default Footer;
