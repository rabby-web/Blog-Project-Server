import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constants';

const userRoutes = Router();

userRoutes.post(
  '/user/',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

// PATCH /api/admin/users/:userId/block
userRoutes.patch(
  '/admin/users/:userId',
  auth(USER_ROLE.admin),
  userController.updateUser,
);

// /api/admin/blogs/:id
userRoutes.delete(
  '/admin/blogs/:id',
  auth(USER_ROLE.admin),
  userController.deleteBlogToDB,
);

export default userRoutes;
