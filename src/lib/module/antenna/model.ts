import mongoose, { model, Schema } from "mongoose";
import { INewAntenna, INewAntennaLink } from "./antenna.types";

const antennaSchema = new Schema<INewAntenna>({
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

const Antenna = (mongoose.models && mongoose.models.Antenna) || model('Antennas', antennaSchema);

export default Antenna;

const antennaLinkSchema = new Schema<INewAntennaLink>({
    source: {
        ref: 'Antennas',
        type: Schema.Types.ObjectId,
    },
    destination: {
        ref: 'Antennas',
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

const AntennaLink = (mongoose.models && mongoose.models.AntennaLink) || model('AntennaLinks', antennaLinkSchema);

export {
    AntennaLink
};
