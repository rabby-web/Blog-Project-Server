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

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await blogService.updateBlog(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  await blogService.deleteBlog(blogId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: {},
  });
});

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const result = await blogService.getAllBlogs(req.query);

    res.send({
      success: true,
      message: 'Blog get successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
