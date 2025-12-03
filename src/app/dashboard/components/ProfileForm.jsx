"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfileForm = ({ user, token, setUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const res = await fetch("/api/users/update", {
         method: "PUT",
         headers: {"Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
        setUser(data.user); // Update parent state
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input className="w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input type="password" className="w-full p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="bg-[#0075be] text-white p-2 rounded hover:bg-[#005f93]">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
