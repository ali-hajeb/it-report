import { Schema } from "mongoose";

export interface INewSwitch {
    location: string | Schema.Types.ObjectId;
    name: string;
    brandModel: string;
    deviceType: string;
    portCount: number;
    poe: boolean;
    managementIP: string;
    activeVlans: string[];
    uplinkPorts: string[];
    role: string;
    currentStatus: 'Active' | 'Offline';
    notes: string;
    coordination: [number, number];
    connectedAntenna: string | Schema.Types.ObjectId;
}

export default interface ISwitch extends INewSwitch {
    _id: string;
}

export interface INewSwitchBackup {
    switch: string | Schema.Types.ObjectId;
    switchName: string;
    lastBackupDate: string;
    storage: string;
    operator: string;
    type: 'Auto' | 'Manual';
    desc: string;
    location: string | Schema.Types.ObjectId;
}

export interface ISwitchBackup extends INewSwitchBackup {
    _id: string;
}

export interface INewSwitchPort {
    switch: string | Schema.Types.ObjectId;
    switchName: string;
    port: number;
    status: 'Up' | 'Down';
    portType: string;
    vlans: string[];
    speed: number;
    poe: boolean;
    connectedDevice: string;
    connectedDeviceType: string;
    desc: string;
    location: string | Schema.Types.ObjectId;
}

export interface ISwitchPort extends INewSwitchPort {
    _id: string;
}
