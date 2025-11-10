import React from "react";
import { Lato } from "next/font/google";
import Link from "next/link";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Offer = () => {
  return (
    <div
      className={`bg-[#f5f7f9] flex flex-col items-center justify-center py-20 ${lato.className}`}
    >
      <div className="mycontainer relative h-[450px] flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner-03.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-5">
          <h3 className="fade-in text-lg uppercase tracking-wide mb-2">
            Limited time offer
          </h3>
          <h2 className="fade-in text-3xl md:text-5xl font-bold mb-4">
            Special Edition
          </h2>
          <p className="fade-in max-w-2xl mx-auto mb-5 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <h3 className="fade-in text-base md:text-lg font-medium mb-6">
            Buy This T-shirt At{" "}
            <span className="fade-in text-white">20% Discount, Use Code OFF20</span>
          </h3>
          <Link href="/" className="fade-in bg-white text-black text-sm font-semibold py-3 px-7 uppercase hover:bg-black hover:text-white transition">Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;
