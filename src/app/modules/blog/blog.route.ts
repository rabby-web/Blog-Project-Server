import { Router } from 'express';
import { blogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const blogRouters = Router();

blogRouters.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog,
);

blogRouters.patch('/:id', auth(USER_ROLE.user), blogController.updateBlog);
blogRouters.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.deleteBlog,
);

blogRouters.get('/', blogController.getAllBlogs);

export default blogRouters;
