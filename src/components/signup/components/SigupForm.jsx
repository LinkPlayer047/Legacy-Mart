import Link from "next/link";
import React from "react";

const SigupForm = () => {
  return (
    <div className="bg-[#f5f7f9] py-20 flex items-center justify-center gap-10">
      <div className="md:w-[50%] lg:w-[35%] w-[90%] bg-white flex flex-col shadow-md rounded-lg px-10 py-10">
        <div className="flex items-center justify-center w-full">
          <h1 className="md:text-4xl text-2xl text-black">Sign Up</h1>
        </div>
        <p className="mt-5 text-gray-500">Name</p>
        <input
          type="text"
          placeholder="Name"
          className="mt-2 border-2 border-gray-300 w-full rounded-md py-2 px-3"
        />
        <p className="mt-5 text-gray-500">Email</p>
        <input
          type="email"
          placeholder="Email"
          className="mt-2 border-2 border-gray-300 w-full rounded-md py-2 px-3"
        />
        <p className="mt-5 text-gray-500">Password</p>
        <input
          type="password"
          placeholder="Password"
          className="mt-2 border-2 border-gray-300 w-full rounded-md py-2 px-3"
        />
        <p className="mt-5 text-gray-500">Confirm Password</p>
        <input
          type="password"
          placeholder="Confirm Password"
          className="mt-2 border-2 border-gray-300 w-full rounded-md py-2 px-3"
        />

        <Link
          href={"/"}
          className="hover:bg-[#146191] bg-[#0075be] text-white py-3 px-10 rounded text-center mt-5"
        >
          Sign up
        </Link>
        <div className="w-full flex items-center justify-center">
          <p className="text-black font-semibold text-xl mt-5">OR</p>
        </div>
        <Link
          href={"/"}
          className="hover:bg-[#146191] bg-[#0075be] text-white py-3 lg:px-10 px-3 rounded text-center mt-5"
        >
          Login with Google
        </Link>
        <p className="mt-5 text-black pl-3">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:text-[#146191] text-[#146191]  text-center mt-3"
          >
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigupForm;
