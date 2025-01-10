const mongoose = require("mongoose");
require("dotenv").config(); 

module.exports = () => {
  try {
    mongoose.connect(process.env.MONGO_DB); 
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to the database!");
  }
};
