/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";


export const handlerZodError = (err: any, res: Response) => {
    const issues = err.issues.map((item: any) => {
        return {
            path: item.path.join('>'),
            message: item.message
        }
    });


    res.status(400).json({
        success: false,
        message: err.message,
        issues: issues,
        error: err
    })

}

// import { ZodError, ZodIssue } from 'zod';
// import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// const handleZodError = (err: ZodError): TGenericErrorResponse => {
//   const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
//     return {
//       path: issue?.path[issue.path.length - 1],
//       message: issue.message,
//     };
//   });

//   const statusCode = 400;

//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorSources,
//   };
// };

// export default handleZodError;