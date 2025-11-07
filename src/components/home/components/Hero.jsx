"use client";
import React, { useEffect } from "react";
import { Lato } from "next/font/google";
export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Hero = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible"); // for fade-out
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative z-10 min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className="mycontainer2 relative z-10 flex flex-col justify-center items-start min-h-screen">
        <div className="lg:w-1/2 w-full flex flex-col items-center text-center lg:text-left lg:items-start justify-center">
          
          {/* ✅ Fade-in text */}
          <h1
            className={`fade-in text-white text-[30px] lg:text-[66px] font-semibold leading-tight ${lato.className}`}
          >
            Raining Offers For Hot Summer!
          </h1>

          <h2
            className={`fade-in text-white text-[20px] lg:text-[26px] font-semibold mt-10 ${lato.className}`}
          >
            25% Off On All Products
          </h2>

          <div className="flex flex-col lg:flex-row items-center lg:gap-5">
            <button
              className={`bg-white text-black text-[12.7px] lg:text-[14px] font-semibold mt-10 uppercase py-3 px-7 ${lato.className}`}
            >
              Shop Now
            </button>
            <button
              className={`border border-white text-white text-[12.7px] lg:text-[14px] font-semibold mt-10 uppercase py-3 px-7 ${lato.className}`}
            >
              Find More
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 hidden lg:flex flex-col items-start justify-center"></div>
      </div>
    </div>
  );
};

export default Hero;
