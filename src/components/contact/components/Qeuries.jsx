import React from "react";
import { Lato } from "next/font/google";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Qeuries = () => {
  return (
    <section className={`w-full bg-[#f5f7f9] py-20 flex justify-center ${lato.className}`}>
      <div className="mycontainer mx-auto flex flex-col items-center">
        <div className="text-center">
          <h3 className="text-[16px] md:text-[18px] font-semibold text-black">
            Have any queries?
          </h3>
          <h2 className="text-[26px] md:text-[42px] font-semibold text-black">
            We're here to help.
          </h2>
          <div className="border-b-2 border-black mt-3 w-[60px] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full">
          <div className="bg-white rounded-lg flex flex-col items-center text-center gap-2 px-6 py-10 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-[22px] md:text-[26px] font-semibold text-black">
              Sales
            </h4>
            <p className="text-[14.5px] md:text-[16px] text-[#3b3b3b]">
              Vestibulum ante ipsum primis in faucibus orci luctus.
            </p>
            <h4 className="text-[16px] md:text-[18px] font-semibold text-[#0084d6]">
              +1 234 567
            </h4>
          </div>
          <div className="bg-white rounded-lg flex flex-col items-center text-center gap-2 px-6 py-10 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-[22px] md:text-[26px] font-semibold text-black">
              Complaints
            </h4>
            <p className="text-[14.5px] md:text-[16px] text-[#3b3b3b]">
              Vestibulum ante ipsum primis in faucibus orci luctus.
            </p>
            <h4 className="text-[16px] md:text-[18px] font-semibold text-[#0084d6]">
              +1900 223
            </h4>
          </div>
          <div className="bg-white rounded-lg flex flex-col items-center text-center gap-2 px-6 py-10 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-[22px] md:text-[26px] font-semibold text-black">
              Returns
            </h4>
            <p className="text-[14.5px] md:text-[16px] text-[#3b3b3b]">
              Vestibulum ante ipsum primis in faucibus orci luctus.
            </p>
            <h4 className="text-[16px] md:text-[18px] font-semibold text-[#0084d6]">
              returns@mail.com
            </h4>
          </div>
          <div className="bg-white rounded-lg flex flex-col items-center text-center gap-2 px-6 py-10 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-[22px] md:text-[26px] font-semibold text-black">
              Marketing
            </h4>
            <p className="text-[14.5px] md:text-[16px] text-[#3b3b3b]">
              Vestibulum ante ipsum primis in faucibus orci luctus.
            </p>
            <h4 className="text-[16px] md:text-[18px] font-semibold text-[#0084d6]">
              +1700 444
            </h4>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-20 w-full">
          <div className="w-full md:w-1/2">
            <p className="text-[15px] text-gray-700">Don't be a stranger!</p>
            <h2 className="text-[30px] md:text-[42px] font-semibold text-black mt-1">
              You tell us. We listen.
            </h2>
            <p className="text-[16px] text-gray-600 mt-5 leading-relaxed">
              Cras elementum finibus lacus nec lacinia. Quisque non convallis
              nisl, eu condimentum sem. Proin dignissim libero lacus, ut
              eleifend magna vehicula et. Nam mattis est sed tellus.
            </p>
          </div>
          <form className="bg-white rounded-lg shadow-lg p-8 md:p-10 flex flex-col gap-5 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
            />
            <textarea
              rows="6"
              placeholder="Message"
              className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#0084d6] hover:bg-[#0075be] text-white py-3 px-8 rounded-md font-semibold transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Qeuries;
