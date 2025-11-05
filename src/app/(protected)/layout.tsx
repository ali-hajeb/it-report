'use client'
import React from "react";
import { redirect } from 'next/navigation';
import UserContext from "@/src/Contexts/UserContext";
import useUser from "@/src/hooks/useUser";
import { AppShell, Burger, Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import IMenuItem from "@/src/Components/MenuList/MenuList.types";
import { IconAntenna, IconBuilding, IconBuildingHospital, IconHome, IconHospital, IconRouter, IconServer, IconSettingsCog, IconSwitch, IconUsers } from "@tabler/icons-react";
import MenuList from "@/src/Components/MenuList";

const menu: IMenuItem[] = [
    {
        id: '1',
        title: 'صفحه اصلی',
        href: '/dashboard',
        icon: <IconHome size={20} />
    },
    {
        id: '2',
        title: 'بیمارستان‌ها',
        href: '/hospitals',
        icon: <IconBuildingHospital size={20} />,
        role: ['MANAGER'],
    },
    {
        id: '22',
        title: 'واحدها',
        href: '/units',
        icon: <IconBuilding size={20} />,
        role: ['ADMIN'],
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
        id: '6',
        title: 'آنتن‌ها',
        href: '/antenna',
        icon: <IconAntenna size={20} />
    },
    {
        id: '7',
        title: 'کاربران',
        href: '/user',
        icon: <IconUsers size={20} />,
        role: ['MANAGER']
    },
    {
        id: '8',
        title: 'تنظیمات',
        href: '/setting',
        icon: <IconSettingsCog size={20} />
    },
];

export interface ProtectedLayoutProps extends React.PropsWithChildren {};

export default function ProtectedLayout({
    children
}: ProtectedLayoutProps) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const { isLoading, user } = useUser();
    if (!isLoading && !user) {
        console.log(user);
        redirect('/');
    }
    return <UserContext value={user}>
        {
            !isLoading && user && 
                    <AppShell 
                        padding={0}
                        header={
                            {
                                height: 32,
                            }
                        }
                        navbar={
                            {
                                width: 300,
                                breakpoint: 'sm',
                                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                            }
                        }> 
                        <AppShell.Header>
                            <Group h="100%" px="md">
                                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                            </Group>
                        </AppShell.Header>
                        <AppShell.Navbar p="md">
                            <MenuList items={menu} />
                        </AppShell.Navbar>
                        <AppShell.Main>
                        <Container bg={'white'} fluid>
                            {children}
                        </Container>
                        </AppShell.Main>
                    </AppShell>
        }
    </UserContext>;
    // const user = await getServerSession();
    // if (!user) {
    //     redirect("/");
    // }
    // return <UserContext value={user}>
    //     {user && children}
    // </UserContext>;
}
