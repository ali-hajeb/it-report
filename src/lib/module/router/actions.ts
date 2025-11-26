import axiosInstance from "@/src/config/axios";
import IRouter, { INewRouter, INewRouterBackup, INewRouterInterface, IRouterBackup, IRouterInterface } from "./router.types";

export async function createRouter(data: INewRouter) {
    return axiosInstance.post('/router', data);
}

export async function updateRouter({ _id, ...updatedData }: IRouter) {
    return axiosInstance.patch('/router', {_id, ...updatedData});
}

export async function deleteRouter(id: string) {
    return axiosInstance.delete(`/router/${id}`);
}

export async function getRouters(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/router', { params })
}

export async function getRouterById(id: string) {
    return axiosInstance.get(`/router/${id}`);
}


export async function createRouterInterface(data: INewRouterInterface) {
    return axiosInstance.post('/router/interface', data);
}

export async function updateRouterInterface({ _id, ...updatedData }: IRouterInterface) {
    return axiosInstance.patch('/router/interface', {_id, ...updatedData});
}

export async function deleteRouterInterface(id: string) {
    return axiosInstance.delete(`/router/interface/${id}`);
}

export async function getRouterInterfaces(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/router/interface', { params })
}

export async function getRouterInterfaceById(id: string) {
    return axiosInstance.get(`/router/interface/${id}`);
}

export async function createRouterBackup(data: INewRouterBackup) {
    return axiosInstance.post('/router/backup', data);
}

export async function updateRouterBackup({ _id, ...updatedData }: IRouterBackup) {
    return axiosInstance.patch('/router/backup', {_id, ...updatedData});
}

export async function deleteRouterBackup(id: string) {
    return axiosInstance.delete(`/router/backup/${id}`);
}

export async function getRouterBackups(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/router/backup', { params })
}

export async function getRouterBackupById(id: string) {
    return axiosInstance.get(`/router/backup/${id}`);
}
