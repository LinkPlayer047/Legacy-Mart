"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { Lato } from 'next/font/google'
import { RxDropdownMenu } from "react-icons/rx";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

export const lato = Lato({ subsets: ['latin'], weight: ['700'] })

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className='w-full absolute z-20 flex items-center justify-center bg-[#146191]/30 py-10'>
      <div className='mycontainer flex items-center justify-between'>
        
        {/* Logo */}
        <div className='lg:w-[10%] w-[40%] lg:flex items-center'>
          <img src="/logo.png" alt="Logo" className='h-10' />
        </div>

        {/* Horizontal Links - Large Screens */}
        <div className='lg:w-[55%] hidden lg:flex items-center gap-7 justify-start'>
          <Link href={'/everything'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Everything</Link>
          <Link href={'/women'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Women</Link>
          <Link href={'/men'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Men</Link>
          <Link href={'/accessories'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Accessories</Link>
        </div>

        {/* Right Links - Large Screens */}
        <div className='lg:w-[25%] hidden lg:flex items-center gap-7 justify-end'>
          <Link href={'/about'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>About</Link>
          <Link href={'/contact'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>Contact Us</Link>
        </div>

        {/* Cart & User Icon */}
        <div className='flex items-center w-[43%] lg:w-[10%] px-2 gap-2 justify-end'>
          <Link href={'/cart'} className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold flex items-center gap-1`}>
            $0.00 <FaBagShopping className='h-5 w-5' />
          </Link>
          <Link href={'/login'} className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold hidden lg:flex`}>
            <FaUser className='h-5 w-5' />
          </Link>
        </div>

        {/* Hamburger Icon - Small Screens */}
        <div className='lg:hidden relative'>
          <button onClick={toggleMenu} className='bg-black p-3 rounded'>
            <RxDropdownMenu className='text-white h-5 w-5' />
          </button>

          {/* Dropdown / Popup Menu */}
          {menuOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50'>
              <Link href={'/everything'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Everything</Link>
              <Link href={'/women'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Women</Link>
              <Link href={'/men'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Men</Link>
              <Link href={'/accessories'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Accessories</Link>
              <hr className='my-1' />
              <Link href={'/about'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>About</Link>
              <Link href={'/contact'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Contact</Link>
              <Link href={'/cart'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Cart</Link>
              <Link href={'/login'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
