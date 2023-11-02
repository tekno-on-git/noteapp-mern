import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    // throw Error('Bazinga!!!!');
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

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
