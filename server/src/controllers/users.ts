import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export const getAuthUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select('+email')
      .exec();
    if (!user) throw createHttpError(401, 'UserId invalid');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw)
      throw createHttpError(400, 'Parameters missing');

    const existUserName = await UserModel.findOne({
      username: username,
    }).exec();

    if (existUserName) {
      throw createHttpError(
        409,
        'Username already exists. Please choose different username.'
      );
    }

    const existEmail = await UserModel.findOne({
      email: email,
    }).exec();

    if (existEmail) {
      throw createHttpError(409, 'Email is already taken. Please log in.');
    }

    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHash,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password)
      throw createHttpError(400, 'Parameters missing.');

    const user = await UserModel.findOne({ username: username })
      .select('+password +email')
      .exec();

    if (!user) throw createHttpError(401, 'invalid credentials.');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw createHttpError(401, 'invalid credentials.');

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    else res.sendStatus(200);
  });
};
