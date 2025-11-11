import type { UserRole } from '@/src/lib/module/user';
import type { DeviceType } from '@/src/lib/module/maintenanceReport';
import type { ILocation } from '@/src/lib/module/location';
import { IAntennaLink } from '../antenna';
import { IMaintenanceReport } from '../maintenanceReport/maintenanceReport.types';

export interface IUserPopulated {
    _id: string;
    firstName: string;
    lastName: string;
    location: ILocation;
    role: UserRole;
}

export interface IUnitPopulated {
    name: string;
    location: ILocation;
}

export interface IAntennaPopulated {
    _id: string;
    name: string;
    type: string;
    model: string;
    frequency: number;
    output: number;
    gain: number;
    installedLocation: string;
    height: number;
    angle: string;
    azimuth: number;
    connectedLink: IAntennaLink;
    linkType: string;
    relatedEquipment: string;
    ip: string;
    macAddress: string;
    connectionType: string;
    firmware: string;
    installationDate: string;
    support: string;
    status: string;
    notes: string;
    location: ILocation;
    maintenance: IMaintenanceReport;
}

export {
    UserRole,
    DeviceType
};
