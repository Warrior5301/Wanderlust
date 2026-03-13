const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await Listing.deleteMany({});
    console.log("Old data deleted");

    const newData = initData.data.map((obj) => ({
      ...obj,
      owner: "69afd730668f05934076abc6",
    }));

    const result = await Listing.insertMany(newData);
    console.log("Inserted count:", result.length);

    console.log("First item:", result[0]);

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.log("ERROR:", err);
  }
}

seedDB();