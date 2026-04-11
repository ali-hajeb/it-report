import { IBlogPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";

export function getCustomFieldValue(data: IBlogPopulated, field: keyof IBlogPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
        case 'author':
            const user = data[field];
            let fullName = '';
            if (user._id) {
                fullName = `${user.firstName} ${user.lastName}`;
            }
            return fullName;
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
