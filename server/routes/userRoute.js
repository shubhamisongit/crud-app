// IMPORTS
const express = require("express"); // Express framework to handle routing and HTTP requests.
const router = express.Router(); // Router object to define and group route handlers.
const userData = require("../models/userModel"); // Importing the user model (userData) to interact with MongoDB collection.

// CREATE USER
router.post("/", async (req, res) => {
  console.log(req.body);
  const { fname, lname, email, age } = req.body; // Destructuring data from request body.
  
  try {
    const userAdded = await userData.create({
      fname: fname,
      lname: lname,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded); // Responds with the newly created user data in JSON format.
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }); // If there's an error, it sends a 400 status with the error message.
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const allUsers = await userData.find(); // Fetch all users from the database.
    res.status(200).json(allUsers); // Sends back all users in JSON format.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sends a 500 status if an error occurs.
  }
});

// GET SINGLE USER BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters.
  
  try {
    const singleUser = await userData.findById({ _id: id }); // Finds the user by ID.
    res.status(200).json(singleUser); // Sends the user data in JSON format.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Sends a 500 status if an error occurs.
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters.
  
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id }); // Deletes the user by ID.
    res.status(201).json(deletedUser); // Sends the deleted user's data in JSON format.
  } catch (error) {
    res.status(400).json({ error: error.message }); // Sends a 400 status with the error message if an error occurs.
  }
});

// UPDATE USER
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params; // Extracting the user ID from the request parameters.
  console.log("get body", req.body); // Logging the request body for debugging.
  console.log("get id", id); // Logging the ID for debugging.
  
  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true, // Option to return the updated user.
    });
    res.status(200).json(updatedUser); // Sends the updated user's data in JSON format.
  } catch (error) {
    res.status(400).json({ error: error.message }); // Sends a 400 status with the error message if an error occurs.
  }
});

module.exports = router; // Exports the router object for use in other files (like server.js).