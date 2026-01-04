import IMenuItem from "@/src/Components/MenuList/MenuList.types"
import { IconAntenna, IconBuildingHospital, IconDeviceLaptop, IconDoorExit, IconHome, IconRouter, IconServer, IconServer2, IconUsers } from "@tabler/icons-react";
import { BASE_PATH } from "./index";

export const menu: IMenuItem[] = [
    {
        id: '1',
        title: 'صفحه اصلی',
        href: `${BASE_PATH}/dashboard`,
        icon: <IconHome size={20} />
    },
    {
        id: '2',
        title: 'مراکز تابع',
        href: `${BASE_PATH}/location`,
        icon: <IconBuildingHospital size={20} />,
        role: ['MANAGER'],
    },
    {
        id: '66',
        title: 'سیستم‌ها',
        href: `${BASE_PATH}/asset`,
        icon: <IconDeviceLaptop size={20} />
    },
    {
        id: '6',
        title: 'آنتن‌ها',
        href: `${BASE_PATH}/antenna`,
        icon: <IconAntenna size={20} />
    },
    {
        id: '3',
        title: 'سرورها',
        href: `${BASE_PATH}/server`,
        icon: <IconServer size={20} />
    },
    {
        id: '4',
        title: 'روترها',
        href: `${BASE_PATH}/router`,
        icon: <IconRouter size={20} />
    },
    {
        id: '5',
        title: 'سوییچ‌ها',
        href: `${BASE_PATH}/switch`,
        icon: <IconServer2 size={20} />
    },
    {
        id: '7',
        title: 'کاربران',
        href: `${BASE_PATH}/user`,
        icon: <IconUsers size={20} />,
        role: ['MANAGER']
    },
    {
        id: '9',
        title: 'خروج',
        href: `${BASE_PATH}/logout`,
        icon: <IconDoorExit size={20} />
    },
];
