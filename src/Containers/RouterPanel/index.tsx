'use client'
import { useContext, useState } from "react"
import { IconRouter, IconCloudDataConnection, IconSettingsCog, IconArrowRightToArc, IconArrowBackUp, IconDatabaseImport } from '@tabler/icons-react';
import { Box, Tabs, Title } from '@mantine/core';
import UserContext from "@/src/Contexts/UserContext";
import { IRouterBackupPopulated, IRouterInterfacePopulated, IRouterPopulated } from "@/src/lib/module/common/types";
import RouterList from "@/src/Components/Router/RouterList";
import RouterInterface from "@/src/Components/Router/RouterInterface";
import RouterBackup from "@/src/Components/Router/Routerbackup";


export interface RouterPannelProps {
    location?: string;
    title?: string;
}

export default function RouterPanel({
    location,
    title
}: RouterPannelProps) {
    const userContext = useContext(UserContext);
    const [activeTab, setActiveTab] = useState<string | null>('router-list');
    const [routers, setRouters] = useState<IRouterPopulated[]>([]);
    const [routerInterfaces, setRouterInterfaces] = useState<IRouterInterfacePopulated[]>([]);
    const [routerBackups, setRouterBackups] = useState<IRouterBackupPopulated[]>([]);
    // const [routerLinks, setRouterLinks] = useState<IRouterLinkPopulated[]>([]);
    // const [maintenanceReports, setMaintenanceReports] = useState<IMaintenanceReportPopulated[]>([]);

    return (
        <>
            {title && <Title>{title}</Title>}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="router-list" leftSection={<IconRouter size={16} />}>فهرست روتر</Tabs.Tab>
                    <Tabs.Tab value="router-interface" leftSection={<IconArrowRightToArc size={16} />}>اینترفیس‌ها</Tabs.Tab>
                    <Tabs.Tab value="router-backup" leftSection={<IconDatabaseImport size={16} />}>اطلاعات پشتیبان‌گیری</Tabs.Tab>
                </Tabs.List>

                <Box px='xs'>
                    <Tabs.Panel value="router-list">
                        <RouterList location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            routers={routers}
                            setRouters={setRouters} />
                    </Tabs.Panel>
                    <Tabs.Panel value="router-interface">
                        <RouterInterface location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            routerInterfaces={routerInterfaces}
                            setRouterInterfaces={setRouterInterfaces} />
                    </Tabs.Panel>
                    <Tabs.Panel value="router-backup">
                        <RouterBackup location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            routerBackups={routerBackups}
                            setRouterBackups={setRouterBackups} />
                    </Tabs.Panel>
                </Box>
            </Tabs>
        </>
    );}
