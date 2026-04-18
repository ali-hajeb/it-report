import { BASE_PATH } from "@/src/Constants";
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
        case 'file':
            return <a 
                href={`${BASE_PATH}${data[field]?.url}`} 
                download={data[field]?.name} // This attribute forces the download behavior
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
                {'دانلود فایل'}
            </a>
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
