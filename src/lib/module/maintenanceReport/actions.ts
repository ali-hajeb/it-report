import axiosInstance from "@/src/config/axios";
import type IMaintenanceReport from "./maintenanceReport.types";
import type { DeviceType, INewMaintenanceReport } from "./maintenanceReport.types";

export async function createMaintenanceReport(data: INewMaintenanceReport) {
    return axiosInstance.post('/maintenance', data);
}

export async function updateMaintenanceReport({ _id, ...updatedData }: IMaintenanceReport) {
    return axiosInstance.patch('/maintenance', {_id, ...updatedData});
}

export async function deleteMaintenanceReport(id: string) {
    return axiosInstance.delete(`/maintenance/${id}`);
}

export async function getMaintenanceReports(params?: Record<string, string>) {
    return axiosInstance.get('/maintenance', { params })
}

export async function getMaintenanceReportsByType(type: DeviceType, params?: Record<string, string>) {
    return axiosInstance.get(`/maintenance/type/${type}`, { params })
}

export async function getMaintenanceReportById(id: string) {
    return axiosInstance.get(`/maintenance/${id}`);
}

