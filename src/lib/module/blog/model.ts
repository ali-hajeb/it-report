import mongoose, { model, Schema } from "mongoose";
import { INewBlog } from "./blog.types";

const blogSchema = new Schema<INewBlog>({
    title: {
        type: String,
        default: '',
    },
    desc: {
        type: String,
        default: '',
    },
    authorName: {
        type: String,
        default: '',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    file: {
        name: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
        default: null,
    },
}, {
        timestamps: true
    });

const Blog = (mongoose.models && mongoose.models.Blogs) || model("Blogs", blogSchema);

export default Blog;

