export interface SwitchForm {
    location: string;
    switchName: string;
    brandModel: string;
    deviceType: string;
    portCount: string;
    poe: boolean;
    managementIP: string;
    activeVlans: string[];
    uplinkPorts: string[];
    role: string;
    currentStatus: string;
    notes: string;
    coordination: string;
    connectedAntenna: string;
}

export interface SwitchBackupForm {
    switch: string;
    switchName: string;
    storage: string;
    operator: string;
    type: string;
    desc: string;
    location: string;
}

export interface SwitchPortForm {
    switch: string;
    switchName: string;
    status: string;
    port: string;
    portType: string;
    vlans: string[];
    speed: string;
    poe: boolean;
    connectedDevice: string;
    connectedDeviceType: string;
    desc: string;
    location: string;
}
