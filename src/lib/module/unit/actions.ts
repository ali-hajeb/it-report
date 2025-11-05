import axiosInstance from "@/src/config/axios";
import type IUnit from "./unit.types";
import type { INewUnit } from "./unit.types";

export async function createUnit(data: INewUnit) {
    return axiosInstance.post('/unit', data);
}

export async function updateUnit({ _id, ...updatedData }: IUnit) {
    return axiosInstance.patch('/unit', {_id, ...updatedData});
}

export async function deleteUnit(id: string) {
    return axiosInstance.delete(`/unit/${id}`);
}

export async function getUnits(params: Record<string, string>) {
    return axiosInstance.get('/unit', { params })
}

export async function getUnitById(id: string) {
    return axiosInstance.get(`/unit/${id}`);
}

