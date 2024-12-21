import { StatusCodes } from 'http-status-codes';
import AppError from '../../helpers/AppError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const register = async (payload: IUser) => {
  const user = await User.isUserExists(payload.email);
  if (user) {
    throw new AppError(400, 'User Already exists !');
  }
  // console.log('r-user', user);
  // console.log(payload);
  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const isBlocked = user.isBlocked; // Assuming isBlocked is boolean

  if (isBlocked) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
  //   expiresIn: '30d',
  // });
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  // jwt.verify(token, config.jwt_access_secret as string); // Ensure this matches

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
