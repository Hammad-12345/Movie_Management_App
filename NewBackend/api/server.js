const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectiondb } = require("../DB/Connect");
const axios = require("axios");
const { userrouter } = require("../mvc/route/AuthRoutes/UserAuthRoutes");
const { FavouriteMovierouter } = require("../mvc/route/FavouriteMovieRoutes/FavouriteMovieRoute");

// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Connect with the database
connectiondb();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("hello");
});

// Movies list route
app.get("/movieslist", async (req, res) => {
  try {
    const response = await axios.get(
      "https://itunes.apple.com/search?term=star&country=au&media=movie&all"
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from iTunes API" });
  }
});

// User routes
app.use("/user", userrouter);

// Favourite movie routes
app.use("/favourite", FavouriteMovierouter);

// Export the app as a Vercel serverless function
module.exports = app;
