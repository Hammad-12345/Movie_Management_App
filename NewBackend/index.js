const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userrouter } = require('./mvc/route/AuthRoutes/UserAuthRoutes');
const { FavouriteMovierouter } = require('./mvc/route/FavouriteMovieRoutes/FavouriteMovieRoute');
const { connectiondb } = require('./DB/Connect');
const axios = require('axios');

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect with database
connectiondb();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/movieslist', async (req, res) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search?term=star&country=au&media=movie&all');
    res.send(response.data); // Return the response to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from iTunes API' });
  }
});

app.use('/user', userrouter);
app.use('/Favourite', FavouriteMovierouter);

// Export the app for Vercel
module.exports = app;
