// "use client";
// import Link from 'next/link'
// import React, { useState, useEffect } from 'react'
// import { Lato } from 'next/font/google'
// import { RxDropdownMenu } from "react-icons/rx";
// import { FaBagShopping } from "react-icons/fa6";
// import { FaUser } from "react-icons/fa";

// export const lato = Lato({ subsets: ['latin'], weight: ['700'] })

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleAccountClick = () => {
//     if (isLoggedIn) {
//       window.location.href = "/dashboard";
//     } else {
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <div className='w-full absolute z-20 flex items-center justify-center bg-[#146191]/30 py-10'>
//       <div className='mycontainer flex items-center justify-between'>
        

//         <div className='lg:w-[10%] w-[40%] lg:flex items-center'>
//           <img src="/logo.png" alt="Logo" className='h-10' />
//         </div>


//         <div className='lg:w-[55%] hidden lg:flex items-center gap-7 justify-start'>
//           <Link href={'/everything'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Everything</Link>
//           <Link href={'/category/women'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Women</Link>
//           <Link href={'/category/men'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Men</Link>
//           <Link href={'/category/accessories'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Accessories</Link>
//         </div>


//         <div className='lg:w-[25%] hidden lg:flex items-center gap-7 justify-end'>
//           <Link href={'/about'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>About</Link>
//           <Link href={'/contact'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>Contact Us</Link>
//         </div>


//         <div className='flex items-center w-[43%] lg:w-[10%] px-2 gap-2 justify-end'>
//           <Link href={'/cart'} className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold flex items-center gap-1`}>
//             ${totalAmount.toFixed(2)}
//              <FaBagShopping className='h-5 w-5' />
//           </Link>
//           <button 
//             onClick={handleAccountClick}
//             className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold hidden lg:flex`}
//           >
//             <FaUser className='h-5 w-5' />
//           </button>
//         </div>


//         <div className='lg:hidden relative'>
//           <button onClick={toggleMenu} className='bg-black p-3 rounded'>
//             <RxDropdownMenu className='text-white h-5 w-5' />
//           </button>


//           {menuOpen && (
//             <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50'>
//               <Link href={'/everything'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Everything</Link>
//               <Link href={'/category/women'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Women</Link>
//               <Link href={'/category/men'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Men</Link>
//               <Link href={'/category/accessories'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Accessories</Link>
//               <hr className='my-1' />
//               <Link href={'/about'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>About</Link>
//               <Link href={'/contact'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Contact</Link>
//               <Link href={'/cart'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Cart</Link>
//               <button
//                 onClick={handleAccountClick}
//                 className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//               >
//                 {isLoggedIn ? "Dashboard" : "Login"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar;



"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Lato } from 'next/font/google'
import { RxDropdownMenu } from "react-icons/rx";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import axios from "axios";


export const lato = Lato({ subsets: ['latin'], weight: ['700'] })

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  axios.get("/api/category")
    .then(res => setCategories(res.data))
    .catch(console.error);
}, []);


  // Cart total calculation
  useEffect(() => {
    const calculateTotal = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
    };

    calculateTotal();
    const interval = setInterval(calculateTotal, 500);

    return () => clearInterval(interval);
  }, []);

  // Login state check on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Listen for changes in localStorage from other tabs
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // Account icon click
  const handleAccountClick = () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className='w-full absolute z-20 flex items-center justify-center bg-[#146191]/30 py-10'>
      <div className='mycontainer flex items-center justify-between'>

        {/* Logo */}
        <div className='lg:w-[10%] w-[40%] lg:flex items-center'>
          <img src="/Legacy-Logo_1.png" alt="Logo" className='h-20' />
        </div>

        {/* Menu Links */}
<div className='lg:w-[55%] hidden lg:flex items-center gap-7 justify-start'>
  <Link href={'/'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Home</Link>
  <Link
    href="/everything"
    className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}
  >
    Everything
  </Link>

  {categories.map((cat) => (
    <Link
      key={cat._id}
      href={`/everything?category=${encodeURIComponent(cat.name)}`}
      className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}
    >
      {cat.name}
    </Link>
  ))}
</div>

{/* Secondary Links */}
<div className='lg:w-[25%] hidden lg:flex items-center gap-7 justify-end'>
  <Link href={'/about'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>About</Link>
  <Link href={'/contact'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>Contact Us</Link>
</div>

{/* Cart + Account (NO CHANGE) */}
<div className='flex items-center w-[43%] lg:w-[10%] px-2 gap-2 justify-end'>
  <Link href={'/cart'} className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold flex items-center gap-1`}>
    ₨ {totalAmount} <FaBagShopping className='h-5 w-5' />
  </Link>
  <button 
    onClick={handleAccountClick}
    className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold hidden lg:flex`}
  >
    <FaUser className='h-5 w-5' />
  </button>
</div>

{/* Mobile Menu */}
<div className='lg:hidden relative'>
  <button onClick={toggleMenu} className='bg-black p-3 rounded'>
    <RxDropdownMenu className='text-white h-5 w-5' />
  </button>

  {menuOpen && (
    <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50'>
      <Link href={'/'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Home</Link>
      <Link href="/everything" className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
        Everything
      </Link>

      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/everything?category=${encodeURIComponent(cat.name)}`}
          className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
        >
          {cat.name}
        </Link>
      ))}

      <hr className='my-1' />
      <Link href={'/about'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>About</Link>
      <Link href={'/contact'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Contact</Link>
      <Link href={'/cart'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Cart</Link>

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

