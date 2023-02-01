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
res.setHeader("content-security-policy-report-only", "default-src 'self'; script-src 'self' 'report-sample'; style-src 'self' 'report-sample'; base-uri 'none'; object-src 'none'; report-uri https://5e52f4c893efcda6a7d40460.endpoint.csper.io")
next();
});
mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(process.env.PORT || PORT, (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});

