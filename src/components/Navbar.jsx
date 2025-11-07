import Link from 'next/link'
import React from 'react'
import { Lato } from 'next/font/google'
export const lato = Lato({ subsets: ['latin'], weight: ['700'] })
import { RxDropdownMenu } from "react-icons/rx";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";




const Navbar = () => {
  return (
    <div className='w-full absolute z-20 flex items-center justify-center bg-[#146191]/30 py-10'>
        <div className='mycontainer flex items-center justify-between'>
            <div className='lg:w-[10%] w-[40%] lg:flex items-center'>
                <img src="/logo.png" alt="" className='h-10' />
            </div>
            <div className='lg:w-[55%] hidden lg:flex items-center gap-7 justify-start'>
                <Link href={'/everything'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>Everything</Link>
                <Link href={'/women'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>women</Link>
                <Link href={'/men'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>men</Link>
                <Link href={'/accessories'} className={`text-white text-[14.4px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>accessories</Link>
            </div>
            <div className='lg:w-[25%] hidden lg:flex items-center gap-7 justify-end'>
                <Link href={'/about'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>about</Link>
                <Link href={'/contact'} className={`text-white text-[13px] hover:text-[#0075c4] uppercase ${lato.className} font-bold`}>contact us</Link>
            </div>
            <div className='flex items-center w-[43%] lg:w-[10%] px-2 gap-2 justify-end'>
                <div className='flex items-center justify-between'>
                    <Link href={'/cart'} className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold`}>$0.00 <FaBagShopping className='h-5 w-5' /></Link>
                </div>
                <Link href={'/login'} className={`text-white text-[13px] uppercase hover:text-[#0075c4] ${lato.className} font-bold hidden lg:flex`}><FaUser className='h-5 w-5' /></Link>
            </div>
            <div className='bg-black w-[17%] md:w-[7%] lg:hidden p-3'>
                <RxDropdownMenu className='text-white h-5 w-5' />
            </div>
        </div>
    </div>
  )
}

export default Navbar