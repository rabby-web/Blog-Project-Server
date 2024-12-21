
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IBlog } from './blog.interface';
import Blog from './blog.model';
import User from '../user/user.model';

// const createBlog = async (payload: IBlog) => {
//   const result = await Blog.create(payload);
//   return result;
// };

const createBlog = async (payload: IBlog, userEmail: string) => {
  const user = await User.isUserExists(userEmail);

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const userId = user?._id;

  const blogData = { ...payload, author: userId };

  const result = await Blog.create(blogData);
  return result;
};

const updateBlog = async (id: string, data: IBlog) => {
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This blog is not exists');
  }
  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteBlog = async (id: string,) => {
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This blog is not exists');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  // const searchableFields = ['title', 'content', 'author'];
  const searchableFields = ['title', 'content'];
  const tours = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sortBy();

  const result = await tours.modelQuery;
  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
