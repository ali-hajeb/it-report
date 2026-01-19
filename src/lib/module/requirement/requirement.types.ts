import { Schema } from "mongoose";

export type RequirementStatus = 'در حال بررسی' | 'انجام شد' | 'رد شد';

export interface INewRequirement {
    location: string | Schema.Types.ObjectId;
    unit: string;
    user: string;
    requirement: string;
    desc: string;
    count: number;
    note: string;
    status: RequirementStatus;
}

export default interface IRequirement extends INewRequirement {
    _id: string;
}
