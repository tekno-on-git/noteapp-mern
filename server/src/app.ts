import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/notes', notesRoutes);

app.use((req, res, next) => {
  next(Error('EndPoint not Found'));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let erMessage = 'the dissapointment is immeasurable';
  if (error instanceof Error) erMessage = error.message;
  res.status(500).json({ error: erMessage });
});

export default app;
