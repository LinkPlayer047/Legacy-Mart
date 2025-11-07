import React from "react";
import { Lato } from "next/font/google";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Intro = () => {
  return (
    <div className="w-full bg-[#f5f7f9] flex items-center justify-center py-20">
      <div
        className={`mycontainer flex flex-col lg:flex-row items-center justify-between bg-white ${lato.className}`}
      >
        <div className="lg:w-1/2 p-15 flex flex-col items-center md:items-start text-center md:text-start">
          <div className="border-2 w-[20%] border-[#0084d6] "></div>
          <h1 className="xl:text-[42px] text-[25px] mt-3">Woh we Are?</h1>
          <p className="xl:text-[16px] text-[14px] font-thin text-gray-600 mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nam nec
            tellus a odio tincidunt auctor a ornare odio.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img src="/slide.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
