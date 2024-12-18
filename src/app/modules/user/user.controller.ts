import { Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create product
const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  // zod validation
  //   const zodParseData = ProductValidationSchema.parse(payload);

  const result = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
