import axiosInstance from "@/src/config/axios";
import IRequirement, { INewRequirement } from "./requirement.types";

export async function createRequirement(data: INewRequirement) {
    return axiosInstance.post('/requirement', data);
}

export async function updateRequirement({ _id, ...updatedData }: IRequirement) {
    return axiosInstance.patch('/requirement', {_id, ...updatedData});
}

export async function deleteRequirement(id: string) {
    return axiosInstance.delete(`/requirement/${id}`);
}

export async function getRequirements(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/requirement', { params })
}

export async function getRequirementById(id: string) {
    return axiosInstance.get(`/requirement/${id}`);
}
