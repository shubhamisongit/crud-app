// IMPORTS
const express = require("express"); // A lightweight web framework for building APIs and web apps.
const dotenv = require("dotenv"); // Loads environment variables from a .env file into process.env.
const mongoose = require("mongoose"); // A library for interacting with MongoDB, providing schema and model functionality.
const userRoute = require("./routes/userRoute"); // Importing user routes which store API endpoints.
const cors = require("cors");

// LOAD ENVIRONMENT VARIABLES
dotenv.config(); // Load .env variables like process.env.URI and process.env.PORT before using them.

// INITIALIZING EXPRESS APP
const app = express(); // Initialize the Express application to define routes, middleware, etc.

// Enable CORS for all routes
app.use(cors())

// MIDDLEWARE TO PARSE JSON
app.use(express.json()); // Automatically parses incoming JSON requests and makes it available in req.body.

// ROUTES
app.use(userRoute); // Routes starting with /users will be handled by userRoute (userRoute.js).
// For example:
// POST /users will create a new user.
// GET /users will retrieve all users.
// GET /users/:id will retrieve a single user by ID.

// ESTABLISHING CONNECTION WITH MONGODB AND STARTING SERVER
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully to MongoDB");
    // Start the server only after MongoDB connection is successful
    app.listen(process.env.PORT || 6000, (err) => {
      if (err) console.log(err);
      console.log(`Server running at port ${process.env.PORT || 6000}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });
// mongoose.connect(process.env.URI): Attempts to connect to your MongoDB database using the connection string stored in the .env file under URI. If the connection is successful, the app starts listening on the specified port.
// app.listen(process.env.PORT || 6000): Starts the server on the port defined in process.env.PORT, or defaults to port 6000 if no port is defined.
// The server won't start until the connection to MongoDB is successfully established.
// then/catch: Handles the promise returned by the mongoose.connect() function:
// If the connection is successful, it starts the server.
// If the connection fails, it logs an error.