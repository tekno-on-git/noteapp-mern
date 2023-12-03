import { RequestHandler } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { assertIsDefined } from '../util/assertIsDefined';

export const getNotes: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId);
    const notes = await NoteModel.find({ userId: authUserId }).exec();
    // throw Error('Bazinga!!!!');
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid Note ID');
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authUserId))
      throw createHttpError(401, "You can't accesss this note");
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId);
    if (!title) {
      throw createHttpError(400, 'Note must have title');
    }
    const newNote = await NoteModel.create({
      userId: authUserId,
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}
interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId);
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, 'Invalid note id');

    if (!newTitle) throw createHttpError(400, 'Note must have a title.');

    const note = await NoteModel.findById(noteId).exec();
    if (!note) throw createHttpError(404, 'note not found');
    if (!note.userId.equals(authUserId))
      throw createHttpError(401, "You can't accesss this note");

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, 'invalid note id');

    const note = await NoteModel.findById(noteId).exec();
    if (!note) throw createHttpError(404, 'Note not found');
    if (!note.userId.equals(authUserId))
      throw createHttpError(401, "You can't accesss this note");

    await note.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
