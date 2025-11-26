import { INewRouter } from "@/src/lib/module/router";

export interface RouterForm {
    routerName: string;
    model: string;
    deviceType: string;
    brand: string;
    os: string;
    osVersion: string;
    managementIP: string;
    lanWanIP: string;
    subnetGateway: string;
    location: string;
    role: string;
    vlans: string[];
    routingProtocols: string;
    natPat: string;
    dhcpEnabled: boolean;
    vpnEnabled: boolean;
    vpnType: string;
    supportResponsible: string;
    notes: string;

}

export interface RouterInterfaceForm {
    router: string;
    routerName: string;
    interface: string;
    connectionType: string;
    ip: string;
    subnet: string;
    status: string;
    desc: string;
    location: string;
}

export interface RouterBackupForm {
    router: string;
    routerName: string;
    storage: string;
    operator: string;
    type: string;
    desc: string;
    location: string;
}
