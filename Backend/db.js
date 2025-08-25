// db.js
const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL_LOCAL || process.env.MONGODB_URL;

if (!mongoURL) {
  console.error("❌ MongoDB URL not found in environment variables.");
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Fail faster if DB not reachable
    });

    console.log("✅ MongoDB connection established");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit app if DB connection fails
  }
}

// Connection events
const db = mongoose.connection;

db.on("connected", () => {
  console.log("🔗 Mongoose connected to DB");
});

db.on("error", (err) => {
  console.error("⚠️ Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.warn("⚠️ Mongoose disconnected from DB");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 Mongoose disconnected on app termination");
  process.exit(0);
});

module.exports = { connectDB, db };
