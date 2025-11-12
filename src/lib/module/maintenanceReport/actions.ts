import axiosInstance from "@/src/config/axios";
import type IMaintenanceReport from "./maintenanceReport.types";
import type { INewMaintenanceReport } from "./maintenanceReport.types";

export async function createMaintenanceReport(data: INewMaintenanceReport) {
    return axiosInstance.post('/maintenanceReport', data);
}

export async function updateMaintenanceReport({ _id, ...updatedData }: IMaintenanceReport) {
    return axiosInstance.patch('/maintenanceReport', {_id, ...updatedData});
}

export async function deleteMaintenanceReport(id: string) {
    return axiosInstance.delete(`/maintenanceReport/${id}`);
}

export async function getMaintenanceReports(params?: Record<string, string>) {
    return axiosInstance.get('/maintenanceReport', { params })
}

export async function getMaintenanceReportById(id: string) {
    return axiosInstance.get(`/maintenanceReport/${id}`);
}

