"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../../userSlice";

const Loginform = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true"); 
        dispatch(login({ token: data.token, userInfo: data.user }));
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#f5f7f9] py-20 flex items-center justify-center">
      <div className="flex md:w-[50%] lg:w-[25%] w-[90%] justify-center flex-col rounded-md bg-white shadow-md py-10 px-5">
        <h1 className="md:text-4xl text-2xl text-black text-center">Log In</h1>
        <form onSubmit={handleLogin} className="flex flex-col mt-5 gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 w-full rounded-md py-2 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-300 w-full rounded-md py-2 px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#0075be] text-white py-3 px-10 rounded mt-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3 text-sm">
          Don't have an account? <Link href="/signup" className="text-[#146191]">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Loginform;
