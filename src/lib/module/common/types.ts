import type { UserRole } from '@/src/lib/module/user';
import type { DeviceType, IMaintenanceReport } from '@/src/lib/module/maintenanceReport';
import type { ILocation } from '@/src/lib/module/location';
import type { IAntenna, IAntennaLink } from '@/src/lib/module/antenna';
import type { IRouter } from '@/src/lib/module/router';
import type { DeviceStatus } from '@/src/lib/module/asset/asset.types';
import ISwitch from '@/src/lib/module/switch/switch.types';

export interface IUserPopulated {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    location: ILocation;
    role: UserRole;
}

export interface IUnitPopulated {
    name: string;
    location: ILocation;
}

export interface IAntennaPopulated {
    _id: string;
    name: string;
    type: string;
    model: string;
    frequency: number;
    output: number;
    gain: number;
    installedLocation: string;
    height: number;
    angle: string;
    azimuth: number;
    connectedLink: IAntennaLink;
    linkType: string;
    connectedDevices: {
        deviceType: DeviceType;
        deviceId: string;
    }[];
    ip: string;
    macAddress: string;
    connectionType: string;
    firmware: string;
    installationDate: string;
    support: string;
    status: string;
    notes: string;
    location: ILocation;
    maintenance: IMaintenanceReport;
    coordination: [number, number];
}

export interface IAntennaLinkPopulated {
    _id: string;
    name: string;
    source: IAntennaLink;
    destination: IAntennaLink;
    distance: number;
    signalIntensity: number;
    linkQuality: number;
    linkType: string;
    bandwidth: number;
    encryption: string;
    status: string;
    notes: string;
    location: ILocation;
}

export interface IMaintenanceReportPopulated {
    _id: string;
    device: IAntennaPopulated | string;
    deviceName: string;
    location: ILocation | string;
    deviceType: DeviceType;
    operation: string;
    operator: string;
    desc: string;
    replacements: string;
    date: string;
}

export interface IServerPopulated {
    _id: string;
    serverName: string;
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
    location: ILocation;
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
    connectedAntenna: IAntenna;
}

export interface IRouterPopulated {
    _id: string;
    routerName: string;
    model: string;
    deviceType: 'Physical' | 'Virtual';
    brand: string;
    os: string;
    osVersion: string;
    managementIP: string;
    lanWanIP: string;
    subnetGateway: string;
    location: ILocation;
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
    connectedAntenna: IAntenna;
}

export interface IRouterInterfacePopulated {
    _id: string;
    router: IRouter;
    routerName: string;
    interface: string;
    connectionType: string;
    ip: string;
    subnet: string;
    status: 'Up' | 'Down';
    desc: string;
    location: ILocation;
}

export interface IRouterBackupPopulated {
    _id: string;
    router: IRouter;
    routerName: string;
    lastBackupDate: string;
    storage: string;
    operator: string;
    type: 'Auto' | 'Manual';
    desc: string;
    location: ILocation;
}

export interface IAssetPopulated {
    _id: string;
    location: ILocation;
    unit: string;
    operator: string;
    user: string;
    case: string;
    caseStatus: DeviceStatus;
    caseType: string;
    monitor: string;
    monitorStatus: DeviceStatus;
    cmDifference: string;
    laptop: string;
    laptopModel: string;
    laptopStatus: DeviceStatus;
    tablet: string;
    tabletModel: string;
    tabletStatus: DeviceStatus;
    mobile: string;
    mobileStatus: DeviceStatus;
    printer: string;
    printerType: string;
    printerModel: string;
    scanner: string;
    scannerModel: string;
    scannerType: string;
    barcodeReader: string;
    token: string;
    antivirus: string;
    os: string;
    desc: string;
}

export interface ISwitchPopulated {
    _id: string;
    location: ILocation;
    switchName: string;
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
    connectedAntenna: IAntenna;
}

export interface ISwitchBackupPopulated {
    _id: string;
    switch: ISwitch;
    switchName: string;
    lastBackupDate: string;
    storage: string;
    operator: string;
    type: 'Auto' | 'Manual';
    desc: string;
    location: ILocation;
}

export interface ISwitchPortPopulated {
    _id: string;
    location: ILocation;
    switch: ISwitch;
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
}

export {
    UserRole,
    DeviceType,
    DeviceStatus
};
