import { Schema } from "mongoose";

export interface INewRouter {
    name: string;
    model: string;
    deviceType: 'Physical' | 'Virtual';
    brand: string;
    os: string;
    osVersion: string;
    managementIP: string;
    lanWanIP: string;
    subnetGateway: string;
    location: string | Schema.Types.ObjectId;
    role: string;
    vlans: string[];
    routingProtocols: string;
    natPat: 'Enabled' | 'Disabled' | 'PAT Only';
    dhcpEnabled: boolean;
    vpnEnabled: boolean;
    vpnType: string;
    installationDate: string;
    lastConfigUpdate: string;
    supportResponsible: string;
    notes: string;
    coordination: [number, number];
    connectedAntenna: string | Schema.Types.ObjectId | null;
}

export default interface IRouter extends INewRouter {
    _id: string;
}

export interface INewRouterInterface {
    router: string | Schema.Types.ObjectId;
    routerName: string;
    interface: string;
    connectionType: string;
    ip: string;
    subnet: string;
    status: 'Up' | 'Down';
    desc: string;
    location: string | Schema.Types.ObjectId;
}

export interface IRouterInterface extends INewRouterInterface {
    _id: string;
}

export interface INewRouterBackup {
    router: string | Schema.Types.ObjectId;
    routerName: string;
    lastBackupDate: string;
    storage: string;
    operator: string;
    type: 'Auto' | 'Manual';
    desc: string;
    location: string | Schema.Types.ObjectId;
}

export interface IRouterBackup extends INewRouterBackup {
    _id: string;
}
