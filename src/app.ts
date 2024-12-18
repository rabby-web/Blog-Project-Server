import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

// import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/products', ProductRoutes);
// application routes
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Blog Project is Running 🎈');
});

app.use(globalErrorHandler)

// console.log(process.cwd());
export default app;
