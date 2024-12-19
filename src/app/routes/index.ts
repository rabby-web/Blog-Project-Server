import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import blogRouters from '../modules/blog/blog.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/blog',
    route: blogRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
