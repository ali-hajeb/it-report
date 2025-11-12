import type IMaintenanceReport from './maintenanceReport.types';
import type { DeviceType, INewMaintenanceReport } from './maintenanceReport.types';
import MaintenanceReport from './model';
import * as maintenanceReportActions from './actions';

export default MaintenanceReport;
export {
    maintenanceReportActions,
    DeviceType,
    INewMaintenanceReport,
    IMaintenanceReport,
};
