import { IAntenna, IAntennaLink } from "@/src/lib/module/antenna";
import { IAntennaLinkPopulated, IAntennaPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { toFarsiNumber } from "@/src/utils/number";
import { Badge } from "@mantine/core";
import moment from "jalali-moment";

export function getCustomFieldValue(data: IAntennaPopulated, field: keyof IAntenna) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'linkType': {
            switch ((data[field] as 'P2MP' | 'P2P').toLowerCase()) {
                case 'p2mp': {
                    return 'Point-to-Multipoint (P2MP)';
                }
                case 'p2p': {
                    return 'Point-to-Point (P2P)';
                }
                default: {
                    break;
                }
            }
        }
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

export function getAntennaLinkCustomFieldValue(data: IAntennaLinkPopulated, field: keyof IAntennaLink) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'source': {
            return (data[field] as IAntennaLink).name;
        }
        case 'destination': {
            return (data[field] as IAntennaLink).name;
        }
        case 'location': {
            return (data[field] as ILocation).name;
        }
        case 'status': {
            let state = '';
            let text = '';
            switch ((data[field] as 'Up' | 'Down').toLowerCase()) {
                case "up": {
                    state = 'green';
                    text = 'فعال';
                    break;
                }
                case "down": {
                    state = 'red';
                    text = 'غیرفعال';
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
