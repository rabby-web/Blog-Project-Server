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

export const userService = {
  createUser,
  updateUser,
};
