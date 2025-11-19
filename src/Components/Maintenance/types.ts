import { DeviceType } from "@/src/lib/module/maintenanceReport";
import { AxiosResponse } from "axios";

export interface MaintenanceReportForm {
    device: string;
    deviceType: string;
    desc: string;
    operation: string;
    operator: string;
    replacements: string;
    location: string;
}

export type Actions = Record<DeviceType, ((params?: Record<string, string | undefined>) => Promise<AxiosResponse<any, any, {}>>) | null>;
