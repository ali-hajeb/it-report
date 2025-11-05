import { Schema } from "mongoose";

export interface INewAnthena {
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
    connectedLink: string;
    linkType: string;
    relatedEquipment: string;
    ip: string;
    macAddress: string;
    connectionType: string;
    firmware: string;
    installationDate: string;
    support: string;
    status: string;
    notes: string;
    maintenance: string | Schema.Types.ObjectId;
};

export default interface IAthena extends INewAnthena {
    _id: string;
};

export interface INewAnthenaLink {
    source: string | Schema.Types.ObjectId;
    destination: string | Schema.Types.ObjectId;
    distance: number;
    signalIntensity: number;
    linkQuality: number;
    linkType: string;
    bandwidth: number;
    encryption: string;
    status: string;
    notes: string;
};

export interface IAnthenaLink extends INewAnthenaLink {
    _id: string;
}
