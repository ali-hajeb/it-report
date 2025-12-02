import { IAntenna } from "@/src/lib/module/antenna";
import { ISwitchBackupPopulated, ISwitchPortPopulated, ISwitchPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { toFarsiNumber } from "@/src/utils/number";
import { Badge, Flex } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import moment from "jalali-moment";

export function getCustomFieldValue(data: ISwitchPopulated, field: keyof ISwitchPopulated) {
    console.log(data, field);
    switch (field) {
        case 'location': 
            return (data[field] as ILocation).name;
        case 'connectedAntenna': 
            console.log('e', (data[field] as IAntenna).name);
            return (data[field] as IAntenna).name;
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
                case "Offline": {
                    state = 'red';
                    text = 'خاموش';
                    break;
                }
                default: {
                    state = 'gray';
                    text = 'نامشخص';
                }
            }
            return (<Badge variant="light" color={state}>{text}</Badge>)
        }
        case 'poe':
            return <Flex align={"center"} justify={'center'}>
                {data[field] ? <IconCheck size={16} color="green" /> : <IconX size={16} color="red" />}
            </Flex>;
        default: {
            return data[field]?.toLocaleString();
        }
    }
}

export function getSwitchPortCustomFieldValue(data: ISwitchPortPopulated, field: keyof ISwitchPortPopulated) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'location': 
            return (data[field] as ILocation).name;
        default: {
            return data[field]?.toLocaleString();
        }
    }
}

export function getSwitchBackupCustomFieldValue(data: ISwitchBackupPopulated, field: keyof ISwitchBackupPopulated) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'location': 
            return (data[field] as ILocation).name;
        case 'lastBackupDate':
            return toFarsiNumber(moment(data[field]).format('jYYYY/jMM/jDD'));
        default: {
            return data[field]?.toLocaleString();
        }
    }
}
