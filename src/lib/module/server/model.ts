import mongoose, { model, Schema } from "mongoose";
import { INewServer, INewServerCheckList } from "./server.types";

const serverSchema: Schema<INewServer> = new Schema<INewServer>({
    name: { type: String, trim: true, default: '' },
    serverType: { type: String, default: 'Virtual', required: true, enum: ['Physical', 'Virtual', 'Cloud', 'Container'] },
    brand: { type: String, required: true, default: '' },
    model: { type: String, default: '', },
    serialNumber: { type: String, unique: true, uppercase: true, trim: true, default: '' },

    internalIP: { type: String, trim: true , default: ''},
    externalIP: { type: String, trim: true , default: ''},

    os: { type: String, default: '', },
    osVersion: { type: String , default: ''},

    role: { type: String, default: '', },
    activeServices: [{ type: String }],

    cpuCores: { type: Number, min: 1, default: 1 },
    ramGB: { type: Number, min: 1, default: 1 },
    hddCapacityGB: { type: Number, default: 0},
    raid: { type: String , default: ''},
    gpu: { type: String , default: ''},

    networkInterfaces: { type: String, default: '' },

    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations'
    },
    perciseLocation: { type: String, default: '', },
    rackName: { type: String , default: ''},
    hostname: { type: String, unique: true, lowercase: true, trim: true , default: ''},
    domainOrWorkgroup: { type: String , default: ''},

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

    supportResponsible: { type: String , default: ''},
    remoteAccess: { type: String , default: ''},
    openPorts: [{ type: Number, default: 0 }],

    notes: { type: String , default: ''},
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
