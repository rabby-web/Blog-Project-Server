import { Router } from 'express';
import { blogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';

const blogRouters = Router();

blogRouters.post(
  '/',
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog,
);

blogRouters.put('/:id', blogController.updateBlog);
blogRouters.delete('/:id', blogController.deleteBlog);

blogRouters.get('/', blogController.getAllBlogs);

export default blogRouters;
