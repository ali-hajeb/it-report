import axiosInstance from "@/app/config/axios";
import { IUser, IUserSchema } from "./user.types";

interface ILoginData {
    username: string;
    password: string;
};
export async function login({ username, password }: ILoginData) {
    try {
        return await axiosInstance.post('/user', { username, password });
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(data: IUserSchema) {
    try {
        return await axiosInstance.put('/user', { data });
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser({ _id, ...updatedData }: IUser) {
    try {
        return await axiosInstance.patch('/user', {_id, ...updatedData});
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(_id: string) {
    try {
        return await axiosInstance.delete('/user', { data: { _id }});
    } catch (error) {
        console.error(error);
    }
}

export async function getUsers(params: Record<string, string>) {
    try {
        return await axiosInstance.get('/user', { params })
    } catch (error) {
        console.error(error);
    }
}

export async function getUserInfo(_id: string) {
    try {
        return await axiosInstance.get('/user', { params: { _id, one: true}});
    } catch (error) {
        console.error(error);
    }
}
