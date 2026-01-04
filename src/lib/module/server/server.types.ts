import { Schema } from "mongoose";

export interface INewServer {
    name: string;
    serverType: string;
    brand: string;
    model: string; 
    serialNumber: string;
    internalIP?: string;
    externalIP?: string;
    os: string; 
    osVersion?: string;
    role: string;
    activeServices?: string[];
    cpuCores: number;
    ramGB: number;
    hddCapacityGB?: number;
    raid?: string;
    gpu?: string;
    networkInterfaces?: string;
    location: string | Schema.Types.ObjectId;
    perciseLocation: string;
    rackName?: string;
    hostname: string;
    domainOrWorkgroup?: string;
    backupStatus: 'Active' | 'Inactive';
    importantSoftware?: string[];
    launchDate?: string; 
    lastUpdateDate?: string;
    currentStatus: 'Active' | 'Down' | 'Reserved';
    supportResponsible?: string;
    remoteAccess?: string;
    openPorts?: number[];
    notes?: string;
    coordination: [number, number];
    connectedAntenna: string | Schema.Types.ObjectId | null;
}

export default interface IServer extends INewServer {
    _id: string;
}

export interface ICheckListItem {
    id: string;
    title: string;
    status: -1 | 0 | 1;
    desc: string;
}

export interface INewServerCheckList {
    date: string;
    server: string | Schema.Types.ObjectId;
    serverName: string;
    location: string | Schema.Types.ObjectId;
    checkList: ICheckListItem[];
}

export interface IServerCheckList extends INewServerCheckList {
    _id: string;
}
