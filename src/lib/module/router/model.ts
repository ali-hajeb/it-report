import mongoose, { model, Schema } from "mongoose";
import { INewRouter, INewRouterBackup, INewRouterInterface } from "./router.types";

const routerSchema = new Schema<INewRouter>({
    name: {
        type: String,
    },
    model: {
        type: String,
    },
    deviceType: {
        type: String,
        enum: ['Physical', 'Virtual'],
    },
    brand: {
        type: String,
    },
    os: {
        type: String,
    },
    osVersion: {
        type: String,
    },
    managementIP: {
        type: String,
    },
    lanWanIP: {
        type: String,
    },
    subnetGateway: {
        type: String,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    role: {
        type: String,
    },
    vlans: [{
        type: String,
    }],
    routingProtocols: {
        type: String,
    },
    natPat: {
        type: String,
        enum: ['Enabled', 'Disabled', 'PAT Only'],
    },
    dhcpEnabled: {
        type: Boolean,
    },
    vpnEnabled: {
        type: Boolean,
    },
    vpnType: {
        type: String,
    },
    installationDate: {
        type: String,
    },
    lastConfigUpdate: {
        type: String,
    },
    supportResponsible: {
        type: String,
    },
    notes: {
        type: String,
    },
    coordination: {
        type: [Number]
    },
    connectedAntenna: {
        type: Schema.Types.ObjectId,
        ref: 'Antennas'
    }
});

const routerInterfaceSchema = new Schema<INewRouterInterface>({
    router: {
        type: Schema.Types.ObjectId,
        ref: 'Routers',
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    routerName: {
        type: String,
    },
    interface: {
        type: String,
    },
    connectionType: {
        type: String,
    },
    ip: {
        type: String,
    },
    subnet: {
        type: String,
    },
    status: {
        type: String,
    },
    desc: {
        type: String,
    }
});

const routerBackupSchema = new Schema<INewRouterBackup>({
    router: {
        type: Schema.Types.ObjectId,
        ref: 'Routers',
    },
    routerName: {
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

const Router = (mongoose.models && mongoose.models.Routers) || model('Routers', routerSchema);
const RouterInterface = (mongoose.models && mongoose.models.RouterInterfaces) || model('RouterInterfaces', routerInterfaceSchema);
const RouterBackup = (mongoose.models && mongoose.models.RouterBackups) || model('RouterBackups', routerBackupSchema);

export {
    RouterInterface,
    RouterBackup
};
export default Router;
