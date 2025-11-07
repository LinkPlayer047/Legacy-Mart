import React from "react";
import { Lato } from "next/font/google";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Team = () => {
  return (
    <div className="w-full bg-[#ffffff] flex items-center justify-center py-20">
      <div
        className={`lg:w-[55%] w-[90%] flex flex-col items-center text-center justify-center py-10 ${lato.className}`}
      >
        <div className="border-2 w-[10%] border-[#0084d6] "></div>
        <h2 className="lg:text-[20px] text-[18px] font-semibold text-black mt-7">
          A Few Words About
        </h2>
        <h1 className="lg:text-[42px] text-[25px] font-semibold text-black mt-3">Our Team</h1>
        <p className="lg:text-[16px] text-[14px] text-[#787777] mt-5">
          Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris
          vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu
          ad litora torquent per conubia nostra.
        </p>
        <div className="w-[80%] md:w-full grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-5 mt-10">
            <div className="bg-[#f5f7f9] rounded-lg flex flex-col items-center text-center px-6 py-10">
                <img src="/1.png" alt="" className="h-20 w-20" />
                <h3 className="text-[20px] font-semibold text-black mt-10">
                    Harvey Spector
                </h3>
                <p className="text-[16px] text-[#787777]">
                    Founder - CEO
                </p>
            </div>
            <div className="bg-[#f5f7f9] rounded-lg flex flex-col items-center text-center px-6 py-10">
                <img src="/2.png" alt="" className="h-20 w-20" />
                <h3 className="text-[20px] font-semibold text-black mt-10">
                    Jessica Pearson
                </h3>
                <p className="text-[16px] text-[#787777]">
                    COO
                </p>
            </div>
            <div className="bg-[#f5f7f9] rounded-lg flex flex-col items-center text-center px-6 py-10">
                <img src="/3.png" alt="" className="h-20 w-20" />
                <h3 className="text-[20px] font-semibold text-black mt-10">
                    Rachel Zain
                </h3>
                <p className="text-[16px] text-[#787777]">
                    Marketing Head
                </p>
            </div>
            <div className="bg-[#f5f7f9] rounded-lg flex flex-col items-center text-center px-6 py-10">
                <img src="/4.png" alt="" className="h-20 w-20" />
                <h3 className="text-[20px] font-semibold text-black mt-10">
                    Luise Litt
                </h3>
                <p className="text-[16px] text-[#787777]">
                    Lead Developer
                </p>
            </div>
            <div className="bg-[#f5f7f9] rounded-lg flex flex-col items-center text-center px-6 py-10">
                <img src="/5.png" alt="" className="h-20 w-20" />
                <h3 className="text-[20px] font-semibold text-black mt-10">
                    Katrina Bennett
                </h3>
                <p className="text-[16px] text-[#787777]">
                    Intern Designer
                </p>
            </div>
            <div className="bg-[#f5f7f9] rounded-lg flex flex-col items-center text-center px-6 py-10">
                <img src="/6.png" alt="" className="h-20 w-20" />
                <h3 className="text-[20px] font-semibold text-black mt-10">
                    Mike Ross
                </h3>
                <p className="text-[16px] font-extralight text-[#787777]">
                    Intern Designer
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
