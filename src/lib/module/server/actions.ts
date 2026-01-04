import axiosInstance from "@/src/config/axios";
import IServer, { INewServer, INewServerCheckList, IServerCheckList } from "./server.types";

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


export async function createServerCheckList(data: INewServerCheckList) {
    return axiosInstance.post('/server/checklist', data);
}

export async function updateServerCheckList({ _id, ...updatedData }: IServerCheckList) {
    return axiosInstance.patch('/server/checklist', {_id, ...updatedData});
}

export async function deleteServerCheckList(id: string) {
    return axiosInstance.delete(`/server/checklist/${id}`);
}

export async function getServersCheckList(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/server/checklist', { params })
}

export async function getServerCheckListById(id: string) {
    return axiosInstance.get(`/server/checklist/${id}`);
}
