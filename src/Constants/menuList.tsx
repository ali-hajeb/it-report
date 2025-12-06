import IMenuItem from "@/src/Components/MenuList/MenuList.types"
import { IconAntenna, IconBuilding, IconBuildingHospital, IconDeviceLaptop, IconDoorExit, IconHome, IconRouter, IconServer, IconSettingsCog, IconSwitch, IconUsers } from "@tabler/icons-react";

export const menu: IMenuItem[] = [
    {
        id: '1',
        title: 'صفحه اصلی',
        href: '/dashboard',
        icon: <IconHome size={20} />
    },
    {
        id: '2',
        title: 'مراکز تابع',
        href: '/location',
        icon: <IconBuildingHospital size={20} />,
        role: ['MANAGER'],
    },
    {
        id: '66',
        title: 'سیستم‌ها',
        href: '/asset',
        icon: <IconDeviceLaptop size={20} />
    },
    {
        id: '6',
        title: 'آنتن‌ها',
        href: '/antenna',
        icon: <IconAntenna size={20} />
    },
    {
        id: '3',
        title: 'سرورها',
        href: '/server',
        icon: <IconServer size={20} />
    },
    {
        id: '4',
        title: 'روترها',
        href: '/router',
        icon: <IconRouter size={20} />
    },
    {
        id: '5',
        title: 'سوییچ‌ها',
        href: '/switch',
        icon: <IconSwitch size={20} />
    },
    {
        id: '7',
        title: 'کاربران',
        href: '/user',
        icon: <IconUsers size={20} />,
        role: ['MANAGER']
    },
    {
        id: '9',
        title: 'خروج',
        href: '/logout',
        icon: <IconDoorExit size={20} />
    },
];
