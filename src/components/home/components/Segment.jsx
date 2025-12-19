import React from "react";
import Link from "next/link";
import { Lato } from "next/font/google";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Segment = () => {
  return (
    <div className={`mycontainer2 flex flex-col lg:flex-row gap-5 py-10 ${lato.className}`}>
      
      {/* WOMEN */}
      <div
        className="relative w-full lg:w-1/3 h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/women.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-5 left-5 px-10 pb-5 flex flex-col gap-3 text-white">
          <h2 className="text-[26px] font-semibold">20% Off On Tank Tops</h2>
          <p className="text-[16px] mb-3">Discover the latest trends and timeless pieces.</p>
          <div>
            <Link
              href="/everything?category=Women"
              className="bg-white text-black text-[16px] py-3 px-7 hover:text-white hover:bg-black transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* MEN */}
      <div
        className="relative w-full lg:w-1/3 h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/men.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-5 left-5 px-10 pb-5 flex flex-col gap-3 text-white">
          <h2 className="text-[26px] font-semibold">Latest Eyewear For You</h2>
          <p className="text-[16px] mb-3">Upgrade your wardrobe with modern styles.</p>
          <div>
            <Link
              href="/everything?category=Men"
              className="bg-white text-black text-[16px] py-3 px-7 hover:text-white hover:bg-black transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* ACCESSORIES */}
      <div
        className="relative w-full lg:w-1/3 h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/footwear.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-5 left-5 px-10 pb-5 flex flex-col gap-3 text-white">
          <h2 className="text-[26px] font-semibold">Let's Lorem Suit Up!</h2>
          <p className="text-[16px] mb-3">Step into comfort and style with premium footwear.</p>
          <div>
            <Link
              href="/everything?category=Accessories"
              className="bg-white text-black text-[16px] py-3 px-7 hover:text-white hover:bg-black transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Segment;
