import axiosInstance from "@/src/config/axios";
import IAsset, { INewAsset } from "./asset.types";

export async function createAsset(data: INewAsset) {
    return axiosInstance.post('/asset', data);
}

export async function updateAsset({ _id, ...updatedData }: IAsset) {
    return axiosInstance.patch('/asset', {_id, ...updatedData});
}

export async function deleteAsset(id: string) {
    return axiosInstance.delete(`/asset/${id}`);
}

export async function getAssets(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/asset', { params })
}

export async function getAssetById(id: string) {
    return axiosInstance.get(`/asset/${id}`);
}
