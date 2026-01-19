import { IRequirementPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";
import { Badge } from "@mantine/core";

export function getCustomFieldValue(data: IRequirementPopulated, field: keyof IRequirementPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
        case 'status': 
            let status = 'yellow';
            let text = 'نامشخص';

            switch (data[field]) {
                case 'در حال بررسی':
                    status = 'cyan';
                    break;
                case 'انجام شد': 
                    status = 'green';
                    break;
                case 'رد شد':
                    status = 'red';
                    break;
            }
            
            return <Badge variant="light" color={status}>{data[field] || text}</Badge>
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
