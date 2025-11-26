import { IRouterBackupPopulated, IRouterInterfacePopulated, IRouterPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { IRouter } from "@/src/lib/module/router";
import { toFarsiNumber } from "@/src/utils/number";
import { Flex } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import moment from "jalali-moment";

export function getCustomFieldValue(data: IRouterPopulated, field: keyof IRouter) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation).name;
        case 'lastConfigUpdate':
            return toFarsiNumber(moment(data[field]).format('jYYYY/jMM/jDD'));
        case 'installationDate':
            return toFarsiNumber(moment(data[field]).format('jYYYY/jMM/jDD'));
        case 'vlans':
            return data[field].join(', ');
        case 'vpnEnabled':
            console.log('vpn', data[field]);
            return <Flex align={"center"} justify={'center'}>
                {data[field] ? <IconCheck size={16} color="green" /> : <IconX size={16} color="red" />}
            </Flex>;
        case 'dhcpEnabled':
            console.log('dhcp', data[field]);
            return <Flex align={"center"} justify={'center'}>
                {data[field] ? <IconCheck size={16} color="green" /> : <IconX size={16} color="red" />}
            </Flex>;
        default: {
            return data[field]?.toLocaleString();
        }
    }
}

export function getRouterInterfaceCustomFieldValue(data: IRouterInterfacePopulated, field: keyof IRouterInterfacePopulated) {
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

export function getRouterBackupCustomFieldValue(data: IRouterBackupPopulated, field: keyof IRouterBackupPopulated) {
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
