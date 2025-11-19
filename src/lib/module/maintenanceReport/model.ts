import mongoose, { model, Schema } from "mongoose";
import { INewMaintenanceReport } from "./maintenanceReport.types";

const MaintenanceReportSchema = new Schema<INewMaintenanceReport>({
    device: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
    },
    location: {
        ref: 'Locations',
        type: Schema.Types.ObjectId,
    },
    deviceType: {
        type: String,
    },
    desc: {
        type: String,
    },
    operation: {
        type: String,
    },
    operator: {
        type: String,
    },
    replacements: {
        type: String,
    },
    date: {
        type: String,
        default: new Date().toISOString()
    }
});

const MaintenanceReport = (mongoose.models && mongoose.models.MaintenanceReports) || model('MaintenanceReports', MaintenanceReportSchema);
export default MaintenanceReport;
