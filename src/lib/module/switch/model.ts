import mongoose, { model, Schema } from "mongoose";
import { INewSwitch, INewSwitchBackup, INewSwitchPort } from "./switch.types";

const switchSchema = new Schema<INewSwitch>({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    name: {
        type: String,
    },
    brandModel: {
        type: String,
    },
    deviceType: {
        type: String,
    },
    portCount: {
        type: Number,
        default: 0,
    },
    poe: {
        type: Boolean,
    },
    managementIP: {
        type: String,
    },
    activeVlans: [{
        type: String,
    }],
    uplinkPorts: [{
        type: String,
    }],
    role: {
        type: String,
    },
    currentStatus: {
        type: String,
    },
    notes: {
        type: String,
    },
    coordination: {
        type: [Number],
        default: [0, 0],
    },
    connectedAntenna: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Antennas'
    }
},
    {timestamps: true});

const switchBackupSchema = new Schema<INewSwitchBackup>({
    switch: {
        type: Schema.Types.ObjectId,
        ref: 'Switches',
    },
    switchName: {
        type: String,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    lastBackupDate: {
        type: String,
    },
    storage: {
        type: String,
    },
    operator: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Auto', 'Manual']
    },
    desc: {
        type: String
    }
});

const switchPortSchema = new Schema<INewSwitchPort>({
    switch: {
        type: Schema.Types.ObjectId,
        ref: 'Switches',
    },
    switchName: {
        type: String,
    },
    port: {
        type: Number,
        default: 0,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    status: {
        type: String,
    },
    portType: {
        type: String,
    },
    vlans: [{
        type: String,
    }],
    speed: {
        type: Number,
        default: 0
    },
    poe: {
        type: Boolean,
        default: false,
    },
    connectedDevice: {
        type: String,
    },
    connectedDeviceType: {
        type: String,
    },
    desc: {
        type: String,
    },
});

const Switch = (mongoose.models && mongoose.models.Switches) || model('Switches', switchSchema);
const SwitchBackup = (mongoose.models && mongoose.models.SwitchBackups) || model('SwitchBackups', switchBackupSchema);
const SwitchPort = (mongoose.models && mongoose.models.SwitchPorts) || model('SwitchPorts', switchPortSchema);

export {
    SwitchBackup,
    SwitchPort,
};
export default Switch;
