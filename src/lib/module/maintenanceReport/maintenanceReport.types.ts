import { Schema } from "mongoose";

export type DeviceType = 'antenna' | 'router' | 'server' | 'switch';

export interface INewMaintenanceReport {
    device: string | Schema.Types.ObjectId;
    deviceName: string;
    location: string | Schema.Types.ObjectId;
    deviceType: DeviceType;
    operation: string;
    operator: string;
    desc: string;
    replacements: string;
};

export default interface IMaintenanceReport extends INewMaintenanceReport {
    _id: string;
}
