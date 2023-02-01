import Movie from "../models/movie.js";
const handleError = (res, error) => {
  res.status(500).json(error);
};
export const getMovies = (req, res) => {
  Movie.find()
    .sort({ title: 1 })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => handleError(res, err));
};

export const getMovie = (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => handleError(res, err));
};

export const deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, err));
};

export const postMovie = (req, res) => {
  const movie = new Movie({
    movie: req.body.movie,
    score: req.body.score,
    user: req.userId,
  });
  movie
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => handleError(res, err));
};

export const updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, err));
};
