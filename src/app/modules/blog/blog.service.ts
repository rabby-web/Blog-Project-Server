import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
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

const deleteBlog = async (id: string) => {
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
