import app from './app';
import env from './util/validateEnv';
import mongoose from 'mongoose';

const PORT = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('mongoose Connected');
    app.listen(PORT, () => console.log(`Server running ON: ${PORT}`));
  })
  .catch(console.error);
