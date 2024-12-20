import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';

const userRoutes = Router();

userRoutes.post(
  '/user/',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

// PATCH /api/admin/users/:userId/block
userRoutes.patch('/admin/users/:userId', auth('admin'),userController.updateUser);

// /api/admin/blogs/:id
userRoutes.delete('/admin/blogs/:id',auth('admin') ,userController.deleteBlogToDB);

export default userRoutes;
