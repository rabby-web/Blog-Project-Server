import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

export const blogService = {
  createBlog,
};
