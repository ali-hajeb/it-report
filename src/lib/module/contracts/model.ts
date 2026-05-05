import mongoose, { model, Schema } from 'mongoose';
import { INewContract } from './contract.types';

const assetSchema = new Schema<INewContract>({
    companyName: {
        type: String,
        default: '',
    },
    softwareName: {
        type: String,
        default: '',
    },
    softwareCategory: {
        type: String,
        default: '',
    },
    unit: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: '',
    },
},
    { timestamps: true }
);

const Contract = (mongoose.models && mongoose.models.Contracts) || model('Contracts', assetSchema);

export default Contract;
