'use client'
import React, { useState } from "react";
import { redirect } from 'next/navigation';
import UserContext from "@/src/Contexts/UserContext";
import useUser from "@/src/hooks/useUser";
import { AppShell, Burger, Container, Flex, Group, Loader, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MenuList from "@/src/Components/MenuList";
import { menu } from '@/src/Constants/menuList';
import { BASE_PATH } from "@/src/Constants";
import TopbarContext from "@/src/Contexts/TopbarContext";


export interface ProtectedLayoutProps extends React.PropsWithChildren {};

export default function ProtectedLayout({
    children
}: ProtectedLayoutProps) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
    const [topbarTitle, setTopbarTitle] = useState('سامانه ثبت مستندات');

    const { isLoading, user } = useUser();
    console.log("protectedLayout", isLoading, user);

    if (!isLoading && !user) {
        console.log(user);
        redirect(`${BASE_PATH}/`);
    }
    return <UserContext value={user}>
        <TopbarContext value={{title: topbarTitle, setTitle: setTopbarTitle}}>
            {
                (!isLoading && user) ? 
                    <AppShell 
                        bg={'white'}
                        withBorder={false}
                        padding={0}
                        header={
                            {
                                height: { base: 64, sm: 0},
                            }
                        }
                        navbar={
                            {
                                width: desktopOpened ? 300 : 64,
                                breakpoint: 'sm',
                                collapsed: { mobile: !mobileOpened},
                            }
                        }> 
                        <AppShell.Header hiddenFrom="sm">
                            <Group h="100%" px="md">
                                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                                <Title order={1} fz={'h3'} hiddenFrom="sm">{topbarTitle}</Title>
                            </Group>
                        </AppShell.Header>
                        <AppShell.Navbar 
                            p="sm" 
                            style={{
                                overflow: 'hidden',
                                transition: '250ms ease-in-out'
                            }}
                            bg={'gray.1'}>
                            <AppShell.Section mb={'md'} pr={6}>
                                {/* <Flex align={'center'} w={40} justify={desktopOpened ? 'start' : 'center'}> */}
                                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                                {/* </Flex> */}
                            </AppShell.Section>
                            <MenuList items={menu} />
                        </AppShell.Navbar>
                        <AppShell.Main py={'md'}>
                            <Container bg={'white'} className="mt-12 md:mt-0" maw={1500} fluid>
                                {children}
                            </Container>
                        </AppShell.Main>
                    </AppShell>
                    :
                    <Flex align={'center'} justify={'center'} h={'100vh'}>
                        <Loader color="gray.0" size={'xl'} type="dots" />
                    </Flex>
            }
        </TopbarContext>
    </UserContext>;
    // const user = await getServerSession();
    // if (!user) {
    //     redirect("/");
    // }
    // return <UserContext value={user}>
    //     {user && children}
    // </UserContext>;
}
