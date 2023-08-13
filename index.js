//packages imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import 'express-async-errors';

//file imports
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoute from './routes/userRoute.js';
import jobRoute from './routes/jobRoute.js';

// REST Object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//  routes
app.get('/', (req, res) => {
  res.send({
    status: 'Running',
    statusCode: res.statusCode,
  });
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', userRoute);
app.use('/api/v1/job', jobRoute);

// validation middleware
app.use(errorMiddleware);

//  listen
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
  app.listen(process.env.PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server on http://localhost:${process.env.PORT}`
    );
  });
};

startServer();
