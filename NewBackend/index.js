const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { connectiondb } = require("./DB/Connect");
const axios = require("axios");
// Load environment variables from .env file
dotenv.config();

// connect with database
connectiondb();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/movieslist", async (req, res) => {
  try {
    const response = await axios.get(
      "https://itunes.apple.com/search?term=star&country=au&media=movie&all"
    );
    res.send(response.data); // Return the response to the frontend
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from iTunes API" });
  }
});
app.use("/user", userrouter);
// app.use("/Favourite",FavouriteMovierouter)

// listen server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
