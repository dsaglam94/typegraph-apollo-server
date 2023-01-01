import mongoose from "mongoose";
import config from "config";

export default async function connectDb() {
  try {
    await mongoose.connect(config.get("MONGO_URI"));
    console.log("Connected to database");
  } catch (error) {
    console.log("DB Error:", error);
    process.exit(1);
  }
}
