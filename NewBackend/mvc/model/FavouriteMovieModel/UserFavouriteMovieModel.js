const mongoose = require("mongoose");

const FavouriteMovieModel = new mongoose.Schema(
  {
    ID: {
        type: String,
        required: true,
      },
    artworkUrl100: {
      type: String,
      required: true,
    },
    trackName: {
      type: String,
      required: true,
    },
    trackPrice: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
    primaryGenreName: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("FavouriteMovie", FavouriteMovieModel);
