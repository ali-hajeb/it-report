import { Schema } from "mongoose";

export type DeviceStatus = 'عالی' | 'خوب' | 'متوسط' | 'ضعیف' | 'N/A';

export interface INewAsset {
    location: string | Schema.Types.ObjectId;
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

export default interface IAsset extends INewAsset {
    _id: string;
}
