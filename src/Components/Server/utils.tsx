import { Badge } from '@mantine/core';
import { IServerPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { toFarsiNumber } from "@/src/utils/number";
import moment from "jalali-moment";
import { IAntenna } from '@/src/lib/module/antenna';

export function getCustomFieldValue(data: IServerPopulated, field: keyof IServerPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
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
        case 'connectedAntenna': 
            return (data[field] as IAntenna)?.name || 'نامشخص';
        case 'backupStatus': {
            let state = '';
            let text = '';
            switch (data[field]) {
                case "Active": {
                    state = 'green';
                    text = 'فعال';
                    console.log('status', data[field]);
                    break;
                }
                case "Inactive": {
                    state = 'red';
                    text = 'غیرفعال';
                    break;
                }
                default: {
                    state = 'gray';
                    text = 'نامشخص';
                }
            }
            return (<Badge variant="light" color={state}>{text}</Badge>)
        }
        case 'currentStatus': {
            let state = '';
            let text = '';
            switch (data[field]) {
                case "Active": {
                    state = 'green';
                    text = 'روشن';
                    console.log('status', data[field]);
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
            return (<Badge variant="light" color={state}>{text}</Badge>)
        }
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
