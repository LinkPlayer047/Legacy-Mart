"use client";

import { Lato } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from 'react'


export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Footer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
  
      const checkLogin = () => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      };
      window.addEventListener("storage", checkLogin);
  
      return () => window.removeEventListener("storage", checkLogin);
    }, []);
  
    const handleAccountClick = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }
    };

  return (
    <div>
      <div className="bg-[#FFFFFF] border-b border-gray-200 pt-10">
        <div className="mycontainer2 py-10 grid grid-cols-2 md:grid-cols-4 gap-10 items-start">
          
          <div className="flex flex-col gap-3">
            <h1 className={`${lato.className} font-bold text-[20px]`}>
              Quick Links
            </h1>
            <Link href="/" className="text-[16px] font-semibold hover:text-blue-700">Home</Link>
            <Link href="/about" className="text-[16px] font-semibold hover:text-blue-700">About</Link>
            <Link href="/login" className="text-[16px] font-semibold hover:text-blue-700">
            <button 
                onClick={handleAccountClick}
                className={`text-black text-[16px] font-semibold hover:text-blue-700 ${lato.className}`}
              >
                My Account
              </button>
            </Link>
            <Link href="/cart" className="text-[16px] font-semibold hover:text-blue-700">Cart</Link>
            <Link href="/contact" className="text-[16px] font-semibold hover:text-blue-700">Contact</Link>
          </div>

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
