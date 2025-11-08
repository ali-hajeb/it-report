import axiosInstance from "@/src/config/axios";
import type IAnthena from "./antenna.types.js";
import type { INewAntenna, INewAntennaLink, IAntennaLink } from "./antenna.types.js";

export async function createAntenna(data: INewAntenna) {
    return axiosInstance.post('/anthena', data);
}

export async function updateAntenna({ _id, ...updatedData }: IAnthena) {
    return axiosInstance.patch('/anthena', {_id, ...updatedData});
}

export async function deleteAntenna(id: string) {
    return axiosInstance.delete(`/anthena/${id}`);
}

export async function getAntennas(params: Record<string, string>) {
    return axiosInstance.get('/anthena', { params })
}

export async function getAntennaById(id: string) {
    return axiosInstance.get(`/anthena/${id}`);
}

export async function createAntennaLink(data: INewAntennaLink) {
    return axiosInstance.post('/anthena/link', data);
}

export async function updateAntennaLink({ _id, ...updatedData }: IAntennaLink) {
    return axiosInstance.patch('/anthena/link', {_id, ...updatedData});
}

export async function deleteAntennaLink(id: string) {
    return axiosInstance.delete(`/anthena/link/${id}`);
}

export async function getAntennasLink(params: Record<string, string>) {
    return axiosInstance.get('/anthena/link', { params })
}

export async function getAntennaLinkById(id: string) {
    return axiosInstance.get(`/anthena/link/${id}`);
}

