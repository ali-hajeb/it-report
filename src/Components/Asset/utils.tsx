import { IAssetPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";

export function getCustomFieldValue(data: IAssetPopulated, field: keyof IAssetPopulated) {
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
