import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const dbUrl: string = process.env.URIMONGO_URL! 
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
