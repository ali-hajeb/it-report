import { model, Schema } from "mongoose";
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
        type: Schema.Types.ObjectId,
        ref: 'ref',
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
});

const MaintenanceReport = (mongoose.models && mongoose.models.MaintenanceReports) || model('MaintenanceReports', MaintenanceReportSchema);
export default MaintenanceReport;
