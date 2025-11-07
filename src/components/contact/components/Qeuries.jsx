"use client";
import React, { useState } from "react";
import { Lato } from "next/font/google";

export const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Qeuries = () => {
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Message sent successfully!");
        e.target.reset();
      } else {
        alert("❌ Something went wrong, please try again.");
      }
    } catch (error) {
      alert("⚠️ Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`w-full bg-[#f5f7f9] py-20 flex justify-center ${lato.className}`}
    >
      <div className="mycontainer mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center">
          <h3 className="text-[16px] md:text-[18px] font-semibold text-black">
            Have any queries?
          </h3>
          <h2 className="text-[26px] md:text-[42px] font-semibold text-black">
            We're here to help.
          </h2>
          <div className="border-b-2 border-black mt-3 w-[60px] mx-auto"></div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full">
          {[
            { title: "Sales", info: "+1 234 567" },
            { title: "Complaints", info: "+1900 223" },
            { title: "Returns", info: "returns@mail.com" },
            { title: "Marketing", info: "+1700 444" },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-lg flex flex-col items-center text-center gap-2 px-6 py-10 shadow hover:shadow-lg transition-shadow"
            >
              <h4 className="text-[22px] md:text-[26px] font-semibold text-black">
                {card.title}
              </h4>
              <p className="text-[14.5px] md:text-[16px] text-[#3b3b3b]">
                Vestibulum ante ipsum primis in faucibus orci luctus.
              </p>
              <h4 className="text-[16px] md:text-[18px] font-semibold text-[#0084d6]">
                {card.info}
              </h4>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-20 w-full">
          {/* Left Text */}
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

          {/* Right Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 md:p-10 flex flex-col gap-5 w-full md:w-1/2"
          >
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
              required
            />
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Message"
              className="border border-gray-300 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0084d6]"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#0084d6] hover:bg-[#0075be]"
              } text-white py-3 px-8 rounded font-semibold transition-all`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Qeuries;
