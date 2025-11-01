import type { UserRole } from '@/app/lib/user/user.types.ts';
import { ILocation } from '@/app/lib/location/location.types';

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
