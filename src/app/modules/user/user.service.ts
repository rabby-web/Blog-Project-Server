import Blog from '../blog/blog.model';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  payload.role = 'admin';
  const result = await User.create(payload);

  return result;
};

const updateUser = async (userId: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });
  return result;
};
const deleteBlogToDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUser,
  updateUser,
  deleteBlogToDB,
};
