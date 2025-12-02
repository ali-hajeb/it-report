import axiosInstance from "@/src/config/axios";
import ISwitch, { INewSwitch, INewSwitchBackup, INewSwitchPort, ISwitchBackup, ISwitchPort } from "./switch.types";

export async function createSwitch(data: INewSwitch) {
    return axiosInstance.post('/switch', data);
}

export async function updateSwitch({ _id, ...updatedData }: ISwitch) {
    return axiosInstance.patch('/switch', {_id, ...updatedData});
}

export async function deleteSwitch(id: string) {
    return axiosInstance.delete(`/switch/${id}`);
}

export async function getSwitches(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/switch', { params })
}

export async function getSwitchById(id: string) {
    return axiosInstance.get(`/switch/${id}`);
}


export async function createSwitchPort(data: INewSwitchPort) {
    return axiosInstance.post('/switch/port', data);
}

export async function updateSwitchPort({ _id, ...updatedData }: ISwitchPort) {
    return axiosInstance.patch('/switch/port', {_id, ...updatedData});
}

export async function deleteSwitchPort(id: string) {
    return axiosInstance.delete(`/switch/port/${id}`);
}

export async function getSwitchPorts(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/switch/port', { params })
}

export async function getSwitchPortById(id: string) {
    return axiosInstance.get(`/switch/port/${id}`);
}


export async function createSwitchBackup(data: INewSwitchBackup) {
    return axiosInstance.post('/switch/backup', data);
}

export async function updateSwitchBackup({ _id, ...updatedData }: ISwitchBackup) {
    return axiosInstance.patch('/switch/backup', {_id, ...updatedData});
}

export async function deleteSwitchBackup(id: string) {
    return axiosInstance.delete(`/switch/backup/${id}`);
}

export async function getSwitchBackups(params?: Record<string, string | undefined>) {
    return axiosInstance.get('/switch/backup', { params })
}

export async function getSwitchBackupById(id: string) {
    return axiosInstance.get(`/switch/backup/${id}`);
}
