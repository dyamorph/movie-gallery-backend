import express from 'express';
import mongoose from 'mongoose';
import movieRoutes from './src/routes/movie-router.js';
import userRoutes from './src/routes/user-router.js';
import cors from 'cors';

const PORT = 4000;
const URL = process.env.MONGODB_URI;
const app = express();
app.use(cors());
app.use(express.json());
app.use(movieRoutes);
app.use(userRoutes);
app.use(function(req, res, next) {
  res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self';" +
  " style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'");
  res.setHeader('Access-Control-Allow-Origin', 'true');
  next();
});
mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(process.env.PORT || PORT, (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});

