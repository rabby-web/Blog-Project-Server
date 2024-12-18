import { Request, Response } from 'express';
import { userService } from './user.service';

// create product
const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    // zod validation
    //   const zodParseData = ProductValidationSchema.parse(payload);

    const result = await userService.createUser(payload);

    res.json({
      status: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};
export const userController = {
  createUser,
};
