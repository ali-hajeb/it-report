import { IAntenna } from "@/src/lib/module/antenna";
import { ISwitchBackupPopulated, ISwitchPortPopulated, ISwitchPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { toFarsiNumber } from "@/src/utils/number";
import { Badge, Flex } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import moment from "jalali-moment";

export function getCustomFieldValue(data: ISwitchPopulated, field: keyof ISwitchPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
        case 'connectedAntenna': 
            return (data[field] as IAntenna)?.name || 'نامشخص';
        case 'currentStatus': {
            let state = '';
            let text = '';
            switch (data[field]) {
                case "Active": {
                    state = 'green';
                    text = 'روشن';
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
            return data[field]?.toLocaleString() || '';
        }
    }
}

export function getSwitchPortCustomFieldValue(data: ISwitchPortPopulated, field: keyof ISwitchPortPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
        case 'status':
            let state = '';
            let text = '';
            switch (data[field]) {
                case "Up": {
                    state = 'green';
                    text = 'روشن';
                    break;
                }
                case "Down": {
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
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}

export function getSwitchBackupCustomFieldValue(data: ISwitchBackupPopulated, field: keyof ISwitchBackupPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
        case 'lastBackupDate':
            return toFarsiNumber(moment(data[field]).format('jYYYY/jMM/jDD'));
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
