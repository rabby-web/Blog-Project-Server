import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const authRouter = Router();

authRouter.post('/auth/register', AuthControllers.register);
export default authRouter;
