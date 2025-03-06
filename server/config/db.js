import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;

export default async function db() {
  try {
    await mongoose.connect(URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}