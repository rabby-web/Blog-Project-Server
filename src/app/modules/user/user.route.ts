import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const userRoutes = Router();

userRoutes.post(
  '/user/',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

// PATCH /api/admin/users/:userId/block
userRoutes.patch('/admin/users/:userId', userController.updateUser);

// /api/admin/blogs/:id
userRoutes.delete('/admin/blogs/:id', userController.deleteBlogToDB);

export default userRoutes;
