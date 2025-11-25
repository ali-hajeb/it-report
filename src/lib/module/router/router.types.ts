import { Schema } from "mongoose";

export interface INewRouter {
    routerName: string;
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
    routingProtocols: string[];
    natPat: 'Enabled' | 'Disabled' | 'PAT Only';
    dhcpEnabled: boolean;
    vpnEnabled: boolean;
    vpnTypes: string[];
    installationDate: string;
    lastConfigUpdate: string;
    supportResponsible: string;
    notes: string;
}

export default interface IRouter extends INewRouter {
    _id: string;
}

export interface INewRouterInterface {
    routerId: string | Schema.Types.ObjectId;
    routerName: string;
    interface: string;
    connectionType: string;
    ip: string;
    subnet: string;
    status: 'Up' | 'Down';
    desc: string;
}

export interface IRouterInterface extends INewRouterInterface {
    _id: string;
}

export interface INewRouterBackup {
    routerId: string | Schema.Types.ObjectId;
    routerName: string;
    lastBackupDate: string;
    storage: string;
    operator: string;
    type: 'Auto' | 'Manual';
    desc: string;
}

export interface IRouterBackup extends INewRouterBackup {
    _id: string;
}
