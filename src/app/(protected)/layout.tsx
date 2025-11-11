'use client'
import React from "react";
import { redirect } from 'next/navigation';
import UserContext from "@/src/Contexts/UserContext";
import useUser from "@/src/hooks/useUser";
import { AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MenuList from "@/src/Components/MenuList";
import { menu } from '@/src/Constants/menuList';


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
                    bg={'white'}
                    withBorder={false}
                    padding={0}
                    header={
                        {
                            height: 32,

                        }
                    }
                    navbar={
                        {
                            width: 200,
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
