import IMenuItem from "@/src/Components/MenuList/MenuList.types"
import { IconAntenna, IconBuildingHospital, IconDeviceLaptop, IconDoorExit, IconHome, IconRouter, IconServer, IconServer2, IconUsers } from "@tabler/icons-react";

export const menu: IMenuItem[] = [
    {
        id: '1',
        title: 'صفحه اصلی',
        href: '/it-rpt/dashboard',
        icon: <IconHome size={20} />
    },
    {
        id: '2',
        title: 'مراکز تابع',
        href: '/it-rpt/location',
        icon: <IconBuildingHospital size={20} />,
        role: ['MANAGER'],
    },
    {
        id: '66',
        title: 'سیستم‌ها',
        href: '/it-rpt/asset',
        icon: <IconDeviceLaptop size={20} />
    },
    {
        id: '6',
        title: 'آنتن‌ها',
        href: '/it-rpt/antenna',
        icon: <IconAntenna size={20} />
    },
    {
        id: '3',
        title: 'سرورها',
        href: '/it-rpt/server',
        icon: <IconServer size={20} />
    },
    {
        id: '4',
        title: 'روترها',
        href: '/it-rpt/router',
        icon: <IconRouter size={20} />
    },
    {
        id: '5',
        title: 'سوییچ‌ها',
        href: '/it-rpt/switch',
        icon: <IconServer2 size={20} />
    },
    {
        id: '7',
        title: 'کاربران',
        href: '/it-rpt/user',
        icon: <IconUsers size={20} />,
        role: ['MANAGER']
    },
    {
        id: '9',
        title: 'خروج',
        href: '/it-rpt/logout',
        icon: <IconDoorExit size={20} />
    },
];
