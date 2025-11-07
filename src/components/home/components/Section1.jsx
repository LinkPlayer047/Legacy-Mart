import React from "react";
import { GiWorld } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Section1 = () => {
  return (
    <div className="bg-[#f5f7f9]">
      <div
        className={`mycontainer2 flex flex-col md:flex-row gap-10 items-center justify-between py-30 ${lato.className}`}
      >
        <div className="flex flex-col gap-3 items-center text-center">
          <GiWorld className="h-15 w-15" />
          <h1 className="lg:text-[18px] text-[15px] font-semibold">
            Worldwide Shipping
          </h1>
          <p className="lg:text-[16px] text-[13px] text-gray-500">
            It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center text-center">
          <FaUserGraduate className="h-15 w-15" />
          <h1 className="lg:text-[18px] text-[15px] font-semibold">
            Best Quality
          </h1>
          <p className="lg:text-[16px] text-[13px] text-gray-500">
            It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center text-center">
          <FaTags className="h-15 w-15" />
          <h1 className="lg:text-[18px] text-[15px] font-semibold">
            Best Offers
          </h1>
          <p className="lg:text-[16px] text-[13px] text-gray-500">
            It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center text-center">
          <MdLockOpen className="h-15 w-15" />
          <h1 className="lg:text-[18px] text-[15px] font-semibold">
            Secure Payments
          </h1>
          <p className="lg:text-[16px] text-[13px] text-gray-500">
            It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
