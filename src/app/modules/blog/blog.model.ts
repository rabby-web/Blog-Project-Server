import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      // minlength: 3,
      // maxlength: 50,
    },
    content: {
      type: String,
      required: [true, 'Please provide title'],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      // required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = model<IBlog>('Blog', blogSchema);
export default Blog;
