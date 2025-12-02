"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: signup, 2: otp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match!");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message); // success toast
        setStep(2); // move to OTP step
      } else {
        toast.error(data.error); // error toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Email verified! Please login."); // success toast
        router.push("/login"); // redirect after OTP
      } else {
        toast.error(data.error); // error toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#f5f7f9] py-20 flex items-center justify-center gap-10">
      <div className="md:w-[50%] lg:w-[35%] w-[90%] bg-white flex flex-col shadow-md rounded-lg px-10 py-10">
        <h1 className="md:text-4xl text-2xl text-black text-center">{step === 1 ? "Sign Up" : "Verify OTP"}</h1>
        
        {step === 1 ? (
          <form onSubmit={handleSignup} className="flex flex-col mt-5 gap-3">
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required className="border-2 border-gray-300 w-full rounded-md py-2 px-3"/>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="border-2 border-gray-300 w-full rounded-md py-2 px-3"/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="border-2 border-gray-300 w-full rounded-md py-2 px-3"/>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required className="border-2 border-gray-300 w-full rounded-md py-2 px-3"/>
            <button type="submit" className="bg-[#0075be] text-white py-3 px-10 rounded mt-3">{loading ? "Signing up..." : "Sign Up"}</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col mt-5 gap-3">
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} required className="border-2 border-gray-300 w-full rounded-md py-2 px-3"/>
            <button type="submit" className="bg-[#0075be] text-white py-3 px-10 rounded mt-3">{loading ? "Verifying..." : "Verify OTP"}</button>
          </form>
        )}

        {step === 1 && (
          <p className="text-center mt-3 text-sm">
            Already have an account? <Link href="/login" className="text-[#146191]">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
