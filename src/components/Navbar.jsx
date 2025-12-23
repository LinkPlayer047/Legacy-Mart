"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Lato } from 'next/font/google'
import { RxDropdownMenu } from "react-icons/rx";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

export const lato = Lato({ subsets: ['latin'], weight: ['700'] })

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cartItems = useSelector(state => state.cart.items || []);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + ((item.product?.price || 0) * (item.quantity || 0)),
    0
  );

  useEffect(() => {
    axios.get("/api/category")
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAccountClick = () => {
    window.location.href = isLoggedIn ? "/dashboard" : "/login";
  };

  return (
    <div className='w-full absolute z-20 flex items-center justify-center bg-[#146191]/30 py-10'>
      <div className='mycontainer flex items-center justify-between'>

        <div className='lg:w-[10%] w-[40%] lg:flex items-center'>
          <img src="/Legacy-Logo_1.png" alt="Logo" className='h-10' />
        </div>

        <div className='lg:w-[55%] hidden lg:flex items-center gap-7 justify-start'>
          <Link href='/' className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Home</Link>
          <Link href="/everything" className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Everything</Link>

          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/everything?category=${encodeURIComponent(cat.name)}`}
              className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className='lg:w-[25%] hidden lg:flex items-center gap-7 justify-end'>
          <Link href='/about' className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>About</Link>
          <Link href='/contact' className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>Contact Us</Link>
        </div>

        <div className='flex items-center w-[43%] lg:w-[10%] px-2 gap-2 justify-end'>
          <Link href='/cart' className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold flex items-center gap-1`}>
            ₨ {totalAmount} <FaBagShopping className='h-5 w-5' />
          </Link>
          <button
            onClick={handleAccountClick}
            className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold hidden lg:flex`}
          >
            <FaUser className='h-5 w-5' />
          </button>
        </div>

        <div className='lg:hidden relative'>
          <button onClick={toggleMenu} className='bg-black p-3 rounded'>
            <RxDropdownMenu className='text-white h-5 w-5' />
          </button>

          {menuOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50'>
              <Link href='/' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Home</Link>
              <Link href="/everything" className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Everything</Link>

              {categories.map(cat => (
                <Link
                  key={cat._id}
                  href={`/everything?category=${encodeURIComponent(cat.name)}`}
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  {cat.name}
                </Link>
              ))}

              <hr className='my-1' />
              <Link href='/about' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>About</Link>
              <Link href='/contact' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Contact</Link>
              <Link href='/cart' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Cart</Link>

              <button
                onClick={handleAccountClick}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                {isLoggedIn ? "Dashboard" : "Login"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar;



