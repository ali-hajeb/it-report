import mongoose, { model, Schema } from "mongoose";
import { INewServer, INewServerCheckList } from "./server.types";

const serverSchema: Schema<INewServer> = new Schema<INewServer>({
    name: { type: String, required: true, trim: true },
    serverType: { type: String, required: true, enum: ['Physical', 'Virtual', 'Cloud', 'Container'] },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },

    internalIP: { type: String, trim: true },
    externalIP: { type: String, trim: true },

    os: { type: String, required: true },
    osVersion: { type: String },

    role: { type: String, required: true },
    activeServices: [{ type: String }],

    cpuCores: { type: Number, required: true, min: 1, default: 1 },
    ramGB: { type: Number, required: true, min: 1, default: 1 },
    hddCapacityGB: { type: Number, default: 0},
    raid: { type: String },
    gpu: { type: String },

    networkInterfaces: { type: String },

    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations'
    },
    perciseLocation: { type: String, required: true },
    rackName: { type: String },
    hostname: { type: String, required: true, unique: true, lowercase: true, trim: true },
    domainOrWorkgroup: { type: String },

    backupStatus: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },

    importantSoftware: [{ type: String }],

    launchDate: { type: String, default: new Date().toISOString() },
    lastUpdateDate: { type: String, default: new Date().toISOString() },

    currentStatus: {
      type: String,
      enum: ['Active', 'Down', 'Reserved'],
      default: 'Active',
    },

    supportResponsible: { type: String },
    remoteAccess: { type: String },
    openPorts: [{ type: Number, default: 0 }],

    notes: { type: String },
    coordination: {
        type: [Number],
        default: [0, 0],
    },
    connectedAntenna: {
        type: Schema.Types.ObjectId,
        ref: 'Antennas'
    }
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const serverCheckList = new Schema<INewServerCheckList>({
    date: {
        type: String,
        default: new Date().toISOString()
    },
    server: {
        type: Schema.Types.ObjectId,
        ref: 'Servers',
    },
    serverName: {
        type: String,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    }, 
    checkList: [{
        id: String,
        title: String,
        status: Number,
    }],
}, {timestamps: true});

const Server = (mongoose.models && mongoose.models.Servers) || model("Servers", serverSchema);
const ServerCheckList = (mongoose.models && mongoose.models.ServerCheckLists) || model("ServerCheckLists", serverCheckList);

export {
    ServerCheckList
};
export default Server;
