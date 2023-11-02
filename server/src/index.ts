import 'dotenv/config';
import env from './util/validateEnv';
import mongoose from 'mongoose';
import express from 'express';

const app = express();
const PORT = env.PORT;
app.get('/', (req, res) => {
  res.send('hello world!');
});

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('mongoose Connected');
    app.listen(PORT, () => console.log(`Server running ON: ${PORT}`));
  })
  .catch(console.error);
