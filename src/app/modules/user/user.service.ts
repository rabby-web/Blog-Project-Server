import { StatusCodes } from 'http-status-codes';
import AppError from '../../helpers/AppError';
import Blog from '../blog/blog.model';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  payload.role = 'admin';
  const result = await User.create(payload);

  return result;
};

const updateUser = async (userId: string, data: IUser) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    // throw new Error('This user is not exists');
    throw new AppError(StatusCodes.BAD_REQUEST, 'This user is not exists');
  }

  if (user.role === 'admin') {
    throw new Error('Only user role can blocked');
  }

  const result = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });
  return result;
};
const deleteBlogToDB = async (id: string) => {
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This blog is not exists');
  }

  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const userService = {
  createUser,
  updateUser,
  deleteBlogToDB,
};
