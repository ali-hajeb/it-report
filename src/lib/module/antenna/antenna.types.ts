import { Schema } from "mongoose";
import { DeviceType } from "@/src/lib/module/common/types";

export interface INewAntenna {
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
    connectedLink: string | Schema.Types.ObjectId | null;
    linkType: string;
    connectedDevices?: {
        deviceType: DeviceType,
        deviceId: string | Schema.Types.ObjectId
    }[];
    ip: string;
    macAddress: string;
    connectionType: string;
    firmware: string;
    installationDate: string;
    support: string;
    status: string;
    notes: string;
    location: string | Schema.Types.ObjectId;
    maintenance: string[] | Schema.Types.ObjectId[];
    coordination: [number, number];
};

export default interface IAtenna extends INewAntenna {
    _id: string;
};

export interface INewAntennaLink {
    name: string;
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
    location: string | Schema.Types.ObjectId;
};

export interface IAntennaLink extends INewAntennaLink {
    _id: string;
}
