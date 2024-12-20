import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';

const authRouter = Router();

authRouter.post('/auth/register', AuthControllers.register);
authRouter.post(
  '/auth/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);
export default authRouter;
