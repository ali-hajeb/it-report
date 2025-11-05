import mongoose, { model, Schema } from "mongoose";
import { INewAnthena, INewAnthenaLink } from "./anthena.types";

const anthenaSchema = new Schema<INewAnthena>({
    name: { type: String, },
    type: { type: String, },
    model: { type: String, },
    frequency: { type: Number, },
    output: { type: Number, },
    gain: { type: Number, },
    installedLocation: { type: String, },
    height: { type: Number, },
    angle: { type: String, },
    azimuth: { type: Number, },
    connectedLink: { type: String, },
    linkType: { type: String, },
    relatedEquipment: { type: String, },
    ip: { type: String, },
    macAddress: { type: String, },
    connectionType: { type: String, },
    firmware: { type: String, },
    installationDate: { type: String, },
    support: { type: String, },
    status: { type: String, }, 
    notes: { type: String, },
    maintenance: {
        ref: 'MaintenanceReports',
        type: Schema.Types.ObjectId,
    }
});

const Anthena = (mongoose.models && mongoose.models.Anthena) || model('Anthenas', anthenaSchema);

export default Anthena;

const anthenaLinkSchema = new Schema<INewAnthenaLink>({
    source: {
        ref: 'Anthenas',
        type: Schema.Types.ObjectId,
    },
    destination: {
        ref: 'Anthenas',
        type: Schema.Types.ObjectId,
    },
    bandwidth: {
        type: Number,
        default: 0,
    },
    distance: {
        type: Number,
        default: 0,
    },
    encryption: {
        type: String,
    },
    linkQuality: {
        type: Number,
        default: 0,
    },
    linkType: {
        type: String,
    },
    signalIntensity: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
    },
    notes: {
        type: String,
    }
});

const AnthenaLink = (mongoose.models && mongoose.models.AnthenaLink) || model('AnthenaLinks', anthenaLinkSchema);

export {
    AnthenaLink
};
