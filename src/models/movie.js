import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    movie: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
