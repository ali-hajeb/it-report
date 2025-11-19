import axiosInstance from "@/src/config/axios";
import IServer, { INewServer } from "./server.types";

export async function createServer(data: INewServer) {
    return axiosInstance.post('/server', data);
}

export async function updateServer({ _id, ...updatedData }: IServer) {
    return axiosInstance.patch('/server', {_id, ...updatedData});
}

export async function deleteServer(id: string) {
    return axiosInstance.delete(`/server/${id}`);
}

export async function getServers(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/server', { params })
}

export async function getServerById(id: string) {
    return axiosInstance.get(`/server/${id}`);
}
