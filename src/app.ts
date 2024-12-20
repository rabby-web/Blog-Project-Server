import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Blog Project is Running 🎈');
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);
// app.use('*', (req: Request, res: Response) => {
//   res.status(404).json({
//     status: false,
//     message: 'Route not found',
//   });
// });

// console.log(process.cwd());
export default app;
