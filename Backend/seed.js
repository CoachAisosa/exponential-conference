const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Check if admin exists
    const existingAdmin = await User.findOne({
      email: "admin@exponential.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists:");
      console.log("   Email: admin@exponential.com");
      console.log("   Password: admin123");
      process.exit(0);
    }

    // Create admin
    const admin = await User.create({
      name: "Exponential Admin",
      email: "admin@exponential.com",
      password: "admin123",
      role: "superadmin",
    });

    console.log("✅ Admin created successfully!");
    console.log("   Email: admin@exponential.com");
    console.log("   Password: admin123");
    console.log("   Role: superadmin");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedAdmin();