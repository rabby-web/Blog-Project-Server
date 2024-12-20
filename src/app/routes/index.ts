import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import blogRouters from '../modules/blog/blog.route';
import authRouter from '../modules/auth/auth.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/api',
    route: authRouter,
  },
  {
    path: '/api',
    route: userRoutes,
  },
  {
    path: '/api/blogs',
    route: blogRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
