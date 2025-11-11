import { IAntenna } from "@/src/lib/module/antenna";
import { IAntennaPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { toFarsiNumber } from "@/src/utils/number";
import { Badge } from "@mantine/core";
import moment from "jalali-moment";

export function getCustomFieldValue(data: IAntennaPopulated, field: keyof IAntenna) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'installationDate': {
            return toFarsiNumber(moment(data[field]).format('jYYYY/jMM/jDD'));
        }
        case 'location': {
            return (data[field] as ILocation).name;
        }
        case 'status': {
            let state = '';
            let text = '';
            switch (data[field] as 'Active' | 'Off' | 'Reserved') {
                case "Active": {
                    state = 'green';
                    text = 'روشن';
                    break;
                }
                case "Off": {
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
            return <Badge 
                variant="light" 
                color={state}>
                {text}
            </Badge>
        }
        default: {
            return data[field]?.toLocaleString();
        }
    }
}
