import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// ---------------------
// MongoDB Connection
// ---------------------
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in your .env.local file");
}

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState;
}

// ---------------------
// Mongoose Model
// ---------------------
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

// ---------------------
// POST API Route
// ---------------------
export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();
    await connectDB();

    // Save data to MongoDB
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    // ---------------------
    // Email Send via Nodemailer
    // ---------------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL, 
      subject: `New Query from ${name} - ${subject}`,
      text: `Name: ${name} Email: ${email} Subject: ${subject} Message:${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Query submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "Error submitting query" },
      { status: 500 }
    );
  }
}
