import { IServerPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import IServer from "@/src/lib/module/server/server.types";
import { toFarsiNumber } from "@/src/utils/number";
import moment from "jalali-moment";

export function getCustomFieldValue(data: IServerPopulated, field: keyof IServer) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'location': 
            return (data[field] as ILocation).name;
        case 'lastUpdateDate':
            return toFarsiNumber(moment(data[field]).format('jyyyy/jmm/jdd'));
        case 'launchDate':
            return toFarsiNumber(moment(data[field]).format('jyyyy/jmm/jdd'));
        case 'activeServices': 
            return (data[field] as string[]).join(', ');
        case 'importantSoftware': 
            return (data[field] as string[]).join(', ');
        case 'openPorts': 
            return (data[field] as number[]).join(', ');
        case 'currentStatus': {
            let state = '';
            let text = '';
            switch (data[field]) {
                case "Active": {
                    state = 'green';
                    text = 'روشن';
                    break;
                }
                case "Down": {
                    state = 'red';
                    text = 'خاموش';
                    break;
                }
                case "Reserved": {
                    state = 'yellow';
                    text = 'رزرو';
                    break;
                }
                default: {
                    state = 'gray';
                    text = 'نامشخص';
                }
            }
        }
        default: {
            return data[field]?.toLocaleString();
        }
    }
}
