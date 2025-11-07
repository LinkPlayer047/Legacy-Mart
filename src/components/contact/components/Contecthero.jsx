import React from 'react'
import { Lato } from "next/font/google";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Contecthero = () => {
  return (
    <div className="relative z-10 h-100 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/banner-06.jpg')" }}>
        <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className={`mycontainer2 relative z-10 flex flex-col items-center justify-center h-100 ${lato.className}`}>  
        <h1 className='text-white text-[30px] md:text-[66px] font-bold'>Contact Us</h1>
      </div>
    </div>
  )
}

export default Contecthero