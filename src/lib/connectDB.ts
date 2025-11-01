import mongoose from "mongoose";

type ConnectionObj = {
  isConnected?: number;
};

const connection: ConnectionObj = {};

async function connectDB(): Promise<void> {
  // If already connected
  if (mongoose.connection.readyState >= 1) {
    console.log("⚡ Already connected to Database");
    return;
  }

  // If still connecting, wait (avoid duplicate connects)
  if (mongoose.connection.readyState === 2) {
    console.log("⏳ Already connecting to Database...");
    return;
  }

  try {
    console.time("MongoDB Connection Time");

    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      bufferCommands: false,
    });

    console.timeEnd("MongoDB Connection Time");

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1)
      console.log("✅ MongoDB Connected Successfully");
    else console.warn("⚠️ MongoDB connected but not ready");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}

export default connectDB;
