// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */

import { StatusCodes } from 'http-status-codes';
import express from 'express';

import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = ((req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: { path: '', message: 'Api not found' },
  });
}) as unknown as express.ErrorRequestHandler;

export default notFound;
