//packages imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

//file imports
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';

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
