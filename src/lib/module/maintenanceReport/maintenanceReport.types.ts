export type DeviceType = 'antenna' | 'router' | 'server' | 'switch';

export interface INewMaintenanceReport {
    device: string;
    deviceType: DeviceType;
    operation: string;
    operator: string;
    desc: string;
    replacements: string;
};

export interface IMaintenanceReport extends INewMaintenanceReport {
    _id: string;
}
