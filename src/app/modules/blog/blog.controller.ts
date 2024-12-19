import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await blogService.createBlog(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: result,
  });
});


export const blogController = {
    createBlog
}