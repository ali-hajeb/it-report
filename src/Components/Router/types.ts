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
    routingProtocols: string[];
    natPat: string;
    dhcpEnabled: boolean;
    vpnEnabled: boolean;
    vpnTypes: string[];
    installationDate: string;
    lastConfigUpdate: string;
    supportResponsible: string;
    notes: string;

}
