import type { UserRole } from '@/src/lib/module/user';
import type { DeviceType } from '@/src/lib/module/maintenanceReport';
import type { ILocation } from '@/src/lib/module/location';

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

export {
    UserRole,
    DeviceType
};
