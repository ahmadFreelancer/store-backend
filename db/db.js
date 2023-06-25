const mongoose = require('mongoose');
require("dotenv").config();

async function ConnectMongo() {
  console.log("Connecting to MongoDB.....")
  await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB")
}

module.exports = ConnectMongo;