
const mongoose = require("mongoose");         //mongoose is a lib that helps Node.js talk to MongoDB.

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);        //“Connect to MongoDB using the URL stored in .env”

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;