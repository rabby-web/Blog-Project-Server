import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Blog title is Required',
    }),
    content: z.string({
      required_error: 'Blog title is Required',
    }),
    author: z.string().optional(),
    // isPublished: z.boolean()
  }),
});

export const BlogValidation = {
  blogValidationSchema,
};
