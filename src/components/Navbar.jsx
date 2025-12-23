"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Lato } from 'next/font/google'
import { RxDropdownMenu } from "react-icons/rx";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from '../../cartSlice';
import { useRouter } from 'next/navigation';

export const lato = Lato({ subsets: ['latin'], weight: ['700'] })

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items || []);
  const router = useRouter();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + ((item.product?.price || 0) * (item.quantity || 0)),
    0
  );

  // Fetch categories
  useEffect(() => {
    axios.get("/api/category")
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  // Check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fetch cart on mount so totalAmount is always correct
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get("/api/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => dispatch(setCart(res.data)))
      .catch(console.error);
  }, [dispatch]);

  const handleAccountClick = () => {
    window.location.href = isLoggedIn ? "/dashboard" : "/login";
  };

  const handleCategoryClick = (categoryName) => {
    router.push(`/everything?category=${encodeURIComponent(categoryName)}`);
  }

  return (
    <div className='w-full absolute z-20 flex items-center justify-center bg-[#146191]/30 py-10'>
      <div className='mycontainer flex items-center justify-between flex-wrap'>

        {/* Logo */}
        <div className='lg:w-[10%] w-[40%] flex items-center'>
          <img src="/Legacy-Logo_1.png" alt="Logo" className='h-10' />
        </div>

        {/* Desktop Menu */}
        <div className='lg:w-[55%] hidden lg:flex items-center gap-7 justify-start flex-wrap'>
          <Link href='/' className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Home</Link>
          <Link href="/everything" className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Everything</Link>

          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold bg-transparent border-none cursor-pointer`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Right Menu - Cart + Account + Links */}
        <div className='lg:w-[35%] hidden lg:flex items-center justify-end gap-5 flex-wrap'>
          <Link href='/about' className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>About</Link>
          <Link href='/contact' className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>Contact Us</Link>

          <Link href='/cart' className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold flex items-center gap-1`}>
            ₨ {totalAmount} <FaBagShopping className='h-5 w-5' />
          </Link>

          <div className={`cursor-pointer text-white text-[14px] hover:text-[#0075c4] ${lato.className} font-bold flex items-center gap-1`} onClick={handleAccountClick}>
            <FaUser className='w-5 h-5' /> Account
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='lg:hidden flex justify-end w-[40%]'>
          <RxDropdownMenu className='w-6 h-6 text-white' onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className='lg:hidden absolute top-[80px] left-0 w-full bg-white shadow-lg flex flex-col items-start gap-5 p-5'>
          <Link href='/' className={`text-black ${lato.className} font-bold`}>Home</Link>
          <Link href="/everything" className={`text-black ${lato.className} font-bold`}>Everything</Link>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`text-black ${lato.className} font-bold bg-transparent border-none cursor-pointer`}
            >
              {cat.name}
            </button>
          ))}
          <Link href='/about' className={`text-black ${lato.className} font-bold`}>About</Link>
          <Link href='/contact' className={`text-black ${lato.className} font-bold`}>Contact Us</Link>
          <Link href='/cart' className={`text-black ${lato.className} font-bold flex items-center gap-1`}>
            ₨ {totalAmount} <FaBagShopping className='h-5 w-5' />
          </Link>
          <div className={`text-black ${lato.className} font-bold flex items-center gap-1`} onClick={handleAccountClick}>
            <FaUser className='w-5 h-5' /> Account
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
