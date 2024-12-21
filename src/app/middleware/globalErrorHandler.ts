/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../helpers/handleZodError';
import handleValidationError from '../helpers/handleValidationError';
import handleCastError from '../helpers/handleCastError';
import handleDuplicateError from '../helpers/handleDuplicateError';
import AppError from '../helpers/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 400;
  let message = err.message || 'Something went wrong!';

  let error: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // error: err,
  });
};

export default globalErrorHandler;
