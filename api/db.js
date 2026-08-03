const mongoose = require("mongoose");

const MONGODB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connection to MongoDB", error.message);
    throw error;
  }
};

module.exports = { MONGODB };