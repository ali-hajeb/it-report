import { IUserPopulated } from "@/src/lib/module/user";
import { Badge } from "@mantine/core";

export function getCustomFieldValue(data: IUserPopulated, field: keyof IUserPopulated) {
    if (!data[field]) {
        return null;
    }

    switch (field) {
        case 'role': 
            let color = '';
            if (data[field] === 'ADMIN') {
                color = 'blue';
            } else {
                color = 'cyan';
            }
            return <Badge variant="light" color={color}>{data[field].toLocaleString()}</Badge>
        case 'location':
            return data[field].name;
        default: {
            return data[field]?.toLocaleString();
        }
    }
}
