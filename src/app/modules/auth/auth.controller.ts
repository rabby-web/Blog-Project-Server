import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthControllers = {
  register,
};
