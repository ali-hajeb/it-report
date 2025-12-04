'use client'
import { useContext, useState } from "react"
import { IconSwitch, IconCloudDataConnection, IconSettingsCog, IconServer2, IconPlugConnected } from '@tabler/icons-react';
import { Box, Tabs, Title } from '@mantine/core';
import SwitchList from "@/src/Components/Switch/SwitchList";
import { ISwitchBackupPopulated, ISwitchPopulated, IMaintenanceReportPopulated, ISwitchPortPopulated } from "@/src/lib/module/common/types";
import MaintenanceReports from "@/src/Components/Maintenance";
import SwitchBackup from "@/src/Components/Switch/SwitchBackup";
import UserContext from "@/src/Contexts/UserContext";
import SwitchPort from "@/src/Components/Switch/SwitchPort";


export interface SwitchPannelProps {
    location?: string;
    title?: string;
}

export default function SwitchPanel({
    location,
    title
}: SwitchPannelProps) {
    const userContext = useContext(UserContext);
    const [activeTab, setActiveTab] = useState<string | null>('switch-list');
    const [switches, setSwitches] = useState<ISwitchPopulated[]>([]);
    const [switchBackups, setSwitchBackups] = useState<ISwitchBackupPopulated[]>([]);
    const [switchPorts, setSwitchPorts] = useState<ISwitchPortPopulated[]>([]);
    const [maintenanceReports, setMaintenanceReports] = useState<IMaintenanceReportPopulated[]>([]);

    return (
        <>
            {title && <Title>{title}</Title>}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="switch-list" leftSection={<IconServer2 size={16} />}>فهرست سوئیچ‌ها</Tabs.Tab>
                    <Tabs.Tab value="switch-maintenance" leftSection={<IconSettingsCog size={16} />}>تاریخچه نگهداری و سرویس</Tabs.Tab>
                    <Tabs.Tab value="switch-backup" leftSection={<IconCloudDataConnection size={16} />}>گزارش‌های پشتیبان‌گیری</Tabs.Tab>
                    <Tabs.Tab value="switch-port" leftSection={<IconPlugConnected size={16} />}>پورت‌ها</Tabs.Tab>
                </Tabs.List>

                <Box px='xs'>
                    <Tabs.Panel value="switch-list">
                        <SwitchList location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            switches={switches}
                            setSwitches={setSwitches} />
                    </Tabs.Panel>
                    <Tabs.Panel value="switch-maintenance">
                        <MaintenanceReports 
                            location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            type="switch" 
                            maintenanceReports={maintenanceReports} 
                            setMaintenanceReports={setMaintenanceReports} />
                    </Tabs.Panel>
                    <Tabs.Panel value="switch-backup">
                        <SwitchBackup 
                            location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            switchBackups={switchBackups}
                            setSwitchBackups={setSwitchBackups} />
                    </Tabs.Panel>
                    <Tabs.Panel value="switch-port">
                        <SwitchPort
                            location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            switchPorts={switchPorts}
                            setSwitchPorts={setSwitchPorts} />
                    </Tabs.Panel>
                </Box>
            </Tabs>
        </>
    );}
