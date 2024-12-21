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
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  await userService.updateUser(userId, body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Blog successfully',
    // data: result,
  });
});

const deleteBlogToDB = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  await userService.deleteBlogToDB(blogId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    // data: '',
  });
});

export const userController = {
  createUser,
  updateUser,
  deleteBlogToDB,
};
