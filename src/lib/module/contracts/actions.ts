import axiosInstance from "@/src/config/axios";
import IContract, { INewContract } from "./contract.types";

export async function createContract(data: INewContract) {
    return axiosInstance.post('/contract', data);
}

export async function updateContract({ _id, ...updatedData }: IContract) {
    return axiosInstance.patch('/contract', {_id, ...updatedData});
}

export async function deleteContract(id: string) {
    return axiosInstance.delete(`/contract/${id}`);
}

export async function getContracts(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/contract', { params })
}

export async function getContractById(id: string) {
    return axiosInstance.get(`/contract/${id}`);
}
