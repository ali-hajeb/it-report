import { DeviceType, IMaintenanceReportPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { toFarsiNumber } from "@/src/utils/number";
import { Badge } from "@mantine/core";
import moment from "jalali-moment";

export function getCustomFieldValue(data: IMaintenanceReportPopulated, field: keyof IMaintenanceReportPopulated) {
    switch (field) {
        case 'date': {
            return toFarsiNumber(moment(data[field]).format('jYYYY/jMM/jDD'));
        }
        case 'deviceType': {
            switch (data[field] as DeviceType) {
                case "antenna": return 'آنتن';
                case "router": return 'روتر';
                case "server": return 'سرور';
                case "switch": return 'سوئیچ';
                case "other": return 'سایر';
            }
        }
        case 'location': {
            return (data[field] as ILocation)?.name || 'نامشخص';
        }
        case 'operation': {
            let state = '';
            let text = '';
            switch (data[field] as 'checking' | 'setting' | 'debugging' | 'changing') {
                case "checking": {
                    state = 'cyan';
                    text = 'بازرسی';
                    break;
                }
                case "setting": {
                    state = 'orange';
                    text = 'تنظیم';
                    break;
                }
                case "debugging": {
                    state = 'blue';
                    text = 'عیب‌یابی';
                    break;
                }
                case "changing": {
                    state = 'indigo';
                    text = 'تعویض';
                    break;
                }
                default: {
                    state = 'grey';
                    text = 'متفرقه';
                }
            }
            return <Badge
                variant="light" 
                color={state}>
                {text}
            </Badge>
        }
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
