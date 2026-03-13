const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Database seeding function to initialize with sample data
async function seedDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL);

    // Delete existing listings
    await Listing.deleteMany({});

    // Map sample data and add owner ID (admin user)
    const newData = initData.data.map((obj) => ({
      ...obj,
      owner: "69afd730668f05934076abc6",
    }));

    // Insert new sample data
    const result = await Listing.insertMany(newData);

    // Close database connection
    await mongoose.connection.close();
  } catch (err) {
    console.error("ERROR during database seeding:", err);
  }
}

seedDB();