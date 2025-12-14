import IMenuItem from "@/src/Components/MenuList/MenuList.types"
import { IconAntenna, IconBuildingHospital, IconDeviceLaptop, IconDoorExit, IconHome, IconRouter, IconServer, IconServer2, IconUsers } from "@tabler/icons-react";

export const menu: IMenuItem[] = [
    {
        id: '1',
        title: 'صفحه اصلی',
        href: '/itrpt/dashboard',
        icon: <IconHome size={20} />
    },
    {
        id: '2',
        title: 'مراکز تابع',
        href: '/itrpt/location',
        icon: <IconBuildingHospital size={20} />,
        role: ['MANAGER'],
    },
    {
        id: '66',
        title: 'سیستم‌ها',
        href: '/itrpt/asset',
        icon: <IconDeviceLaptop size={20} />
    },
    {
        id: '6',
        title: 'آنتن‌ها',
        href: '/itrpt/antenna',
        icon: <IconAntenna size={20} />
    },
    {
        id: '3',
        title: 'سرورها',
        href: '/itrpt/server',
        icon: <IconServer size={20} />
    },
    {
        id: '4',
        title: 'روترها',
        href: '/itrpt/router',
        icon: <IconRouter size={20} />
    },
    {
        id: '5',
        title: 'سوییچ‌ها',
        href: '/itrpt/switch',
        icon: <IconServer2 size={20} />
    },
    {
        id: '7',
        title: 'کاربران',
        href: '/itrpt/user',
        icon: <IconUsers size={20} />,
        role: ['MANAGER']
    },
    {
        id: '9',
        title: 'خروج',
        href: '/itrpt/logout',
        icon: <IconDoorExit size={20} />
    },
];
