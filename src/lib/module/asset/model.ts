import mongoose, { model, Schema } from 'mongoose';
import { INewAsset } from './asset.types';

const assetSchema = new Schema<INewAsset>({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    unit: {
        type: String,
    },
    operator: {
        type: String,
    },
    user: {
        type: String,
    },
    case: {
        type: String,
    },
    caseStatus: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'N/A'],
        default: 'N/A'
    },
    caseType: {
        type: String,
    },

    monitor: {
        type: String,
    },
    monitorStatus: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'N/A'],
        default: 'N/A'
    },
    cmDifference: {
        type: String,
    },
    laptop: {
        type: String,
    },
    laptopModel: {
        type: String,
    },
    laptopStatus: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'N/A'],
        default: 'N/A'
    },
    tablet: {
        type: String,
    },
    tabletModel: {
        type: String,
    },
    tabletStatus: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'N/A'],
        default: 'N/A'
    },
    mobile: {
        type: String,
    },
    mobileStatus: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'N/A'],
        default: 'N/A'
    },
    printer: {
        type: String,
    },
    printerModel: {
        type: String,
    },
    printerType: {
        type: String,
    },
    scanner: {
        type: String,
    },
    scannerModel: {
        type: String,
    },
    scannerType: {
        type: String,
    },
    barcodeReader: {
        type: String,
    },
    token: {
        type: String,
    },
    antivirus: {
        type: String,
    },
    os: {
        type: String,
    },
    desc: {
        type: String,
    },
});

const Asset = (mongoose.models && mongoose.models.Assets) || model('Assets', assetSchema);

export default Asset;
