// IMPORTS
const mongoose = require("mongoose"); // Mongoose library to define schemas and interact with MongoDB.

// CREATE SCHEMA
const userDataSchema = new mongoose.Schema(
  {
    fname: {
      type: String, // The 'name' field must be a string.
      required: true, // 'name' is a required field.
    },
    lname: {
      type: String, // The 'name' field must be a string.
      required: false, // 'name' is a required field.
    },
    email: {
      type: String, // The 'email' field must be a string.
      unique: true, // 'email' must be unique (no duplicates).
      required: true, // 'email' is a required field.
    },
    age: {
      type: Number, // The 'age' field is optional and must be a number.
    },
  },
  { timestamps: true } // This option automatically adds `createdAt` and `updatedAt` timestamps.
);

// CREATE MODEL
const userData = mongoose.model("UserData", userDataSchema); 
// This creates a Mongoose model for 'UserData' based on the defined schema (userDataSchema).
// Models are used to interact with the MongoDB collection (CRUD operations).

module.exports = userData; // Exporting the userData model for use in route handlers (like userRoute.js).