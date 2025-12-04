export interface AntennaForm {
    name: string;
    type: string;
    model: string,
    frequency: string,
    output: string,
    gain: string,
    location: string,
    installedLocation: string,
    height: string,
    angle: string,
    azimuth: string,
    connectedLink: string,
    linkType: string,
    coordination: string;
    // connectedDevices: {
    //     deviceType: string;
    //     deviceId: string;
    // }[],
    ip: string,
    macAddress: string,
    connectionType: string,
    firmware: string,
    support: string,
    status: string,
    notes: string,
}

export interface AntennaLinkForm {
    name: string;
    source: string;
    destination: string;
    distance: string;
    signalIntensity: string;
    linkQuality: string;
    linkType: string;
    bandwidth: string;
    encryption: string;
    status: string;
    notes: string;
    location: string;
}
