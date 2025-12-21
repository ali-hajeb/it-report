import { DeviceStatus, IAssetPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { Badge } from "@mantine/core";

export function getCustomFieldValue(data: IAssetPopulated, field: keyof IAssetPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation).name;
        default: {
            if (field.toLowerCase().includes('status')) {
                let state = '';
                let text = '';
                switch (data[field] as DeviceStatus) {
                    case "عالی": {
                        state = 'gold';
                        text = data[field];
                        break;
                    }
                    case "خوب": {
                        state = 'silver';
                        text = data[field];
                        break;
                    }
                    case "متوسط": {
                        state = 'bronze';
                        text = data[field];
                        break;
                    }
                    case "ضعیف": {
                        state = 'red';
                        text = data[field];
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
            return data[field]?.toLocaleString();
        }
    }
}
