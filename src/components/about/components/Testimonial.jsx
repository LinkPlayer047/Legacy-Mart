import React from "react";
import { Lato } from "next/font/google";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoLogoGoogleplus } from "react-icons/io";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Testimonial = () => {
  return (
    <section
      className="relative flex items-center justify-center h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/banner-05.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div
        className={`relative z-10 bg-[#f5f7f9] h-[200px] md:h-[400px] flex flex-col items-center justify-center gap-5 px-6 py-10 text-center md:w-[40%] lg:w-[25%] ${lato.className}`}
      >
        <div className="border-2 border-[#0084d6] w-[60px] mx-auto"></div>

        <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-semibold text-black">
          Follow Us
        </h1>
        <div className="flex items-center justify-center gap-6 text-black text-[20px] md:text-[24px]">
          <a
            href="#"
            className="hover:text-[#0084d6] transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="hover:text-[#0084d6] transition-colors duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-[#0084d6] transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="hover:text-[#0084d6] transition-colors duration-300"
          >
            <IoLogoGoogleplus />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
