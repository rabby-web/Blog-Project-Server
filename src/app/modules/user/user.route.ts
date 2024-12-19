import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const userRoutes = Router();

userRoutes.post(
  '/',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);
export default userRoutes;
