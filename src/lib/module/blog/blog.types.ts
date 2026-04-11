import { Schema } from "mongoose";

export interface IBlogFile {
    name: string;
    url: string;
}

export interface INewBlog {
    title: string;
    author: string | Schema.Types.ObjectId;
    location: string | Schema.Types.ObjectId;
    authorName: string;
    file?: IBlogFile;
    desc: string;
}

export default interface IBlog extends INewBlog {
    _id: string;
    newFile?: IBlogFile;
    createdAt?: Date;
}
