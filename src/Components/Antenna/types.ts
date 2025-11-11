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
    relatedEquipment: string,
    ip: string,
    macAddress: string,
    connectionType: string,
    firmware: string,
    support: string,
    status: string,
    notes: string,
}

export const filters = {
    name: 'براساس نام آنتن',
    model: 'براساس مدل',
    ip: 'براساس ip',
    support: 'براساس مسئول پشتیبانی',
    status: 'براساس وضعیت'
}
