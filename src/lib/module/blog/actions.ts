import axiosInstance from "@/src/config/axios";
import IBlog, { IBlogFile, INewBlog } from "./blog.types";

export interface INewBlogWithFile extends INewBlog {
    newFile?: IBlogFile;
}
export async function createPost(data: INewBlogWithFile) {
    return axiosInstance.post('/blog', data);
}

export async function updatePost({ _id, ...updatedData }: IBlog) {
    return axiosInstance.patch('/blog', {_id, ...updatedData});
}

export async function deletePost(id: string) {
    return axiosInstance.delete(`/blog/${id}`);
}

export async function getPosts(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/blog', { params })
}

export async function getPostById(id: string) {
    return axiosInstance.get(`/blog/${id}`);
}
