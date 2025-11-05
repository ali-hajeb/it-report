import axiosInstance from "@/src/config/axios";
import type IAnthena from "./anthena.types.ts";
import type { INewAnthena, INewAnthenaLink, IAnthenaLink } from "./anthena.types";

export async function createAnthena(data: INewAnthena) {
    return axiosInstance.post('/anthena', data);
}

export async function updateAnthena({ _id, ...updatedData }: IAnthena) {
    return axiosInstance.patch('/anthena', {_id, ...updatedData});
}

export async function deleteAnthena(id: string) {
    return axiosInstance.delete(`/anthena/${id}`);
}

export async function getAnthenas(params: Record<string, string>) {
    return axiosInstance.get('/anthena', { params })
}

export async function getAnthenaById(id: string) {
    return axiosInstance.get(`/anthena/${id}`);
}

export async function createAnthenaLink(data: INewAnthenaLink) {
    return axiosInstance.post('/anthena/link', data);
}

export async function updateAnthenaLink({ _id, ...updatedData }: IAnthenaLink) {
    return axiosInstance.patch('/anthena/link', {_id, ...updatedData});
}

export async function deleteAnthenaLink(id: string) {
    return axiosInstance.delete(`/anthena/link/${id}`);
}

export async function getAnthenasLink(params: Record<string, string>) {
    return axiosInstance.get('/anthena/link', { params })
}

export async function getAnthenaLinkById(id: string) {
    return axiosInstance.get(`/anthena/link/${id}`);
}

