//

// imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// REST Object

const app = express();

// routes

app.get('/', (req, res) => {
  res.send({
    status: 'Running',
    statusCode: res.statusCode,
  });
});

// listen

app.listen(process.env.PORT, () => {
  console.log(
    `${process.env.NODE_ENV} Server on :- http://localhost:${process.env.PORT}`
  );
});
