'use client'
import { useContext, useState } from "react"
import { IconAntenna, IconCloudDataConnection, IconSettingsCog } from '@tabler/icons-react';
import { Box, Tabs, Title } from '@mantine/core';
import AntennaList from "@/src/Components/Antenna/AntennaList";
import { IAntennaLinkPopulated, IAntennaPopulated, IMaintenanceReportPopulated } from "@/src/lib/module/common/types";
import MaintenanceReports from "@/src/Components/Maintenance";
import AntennaLinks from "@/src/Components/Antenna/AntennaLinks";
import UserContext from "@/src/Contexts/UserContext";


export interface AntennaPannelProps {
    location?: string;
    title?: string;
}

export default function AntennaPanel({
    location,
    title
}: AntennaPannelProps) {
    const userContext = useContext(UserContext);
    const [activeTab, setActiveTab] = useState<string | null>('antenna-list');
    const [antennas, setAntennas] = useState<IAntennaPopulated[]>([]);
    const [antennaLinks, setAntennaLinks] = useState<IAntennaLinkPopulated[]>([]);
    const [maintenanceReports, setMaintenanceReports] = useState<IMaintenanceReportPopulated[]>([]);

    return (
        <>
            {title && <Title mt={'md'}>{title}</Title>}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="antenna-list" leftSection={<IconAntenna size={16} />}>فهرست آنتن‌ها</Tabs.Tab>
                    <Tabs.Tab value="antenna-maintenance" leftSection={<IconSettingsCog size={16} />}>تاریخچه نگهداری و سرویس</Tabs.Tab>
                    <Tabs.Tab value="antenna-connections" leftSection={<IconCloudDataConnection size={16} />}>لینک‌ها و اتصالات</Tabs.Tab>
                </Tabs.List>

                <Box px='xs'>
                    <Tabs.Panel value="antenna-list">
                        <AntennaList location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            antennas={antennas}
                            setAntennas={setAntennas} />
                    </Tabs.Panel>
                    <Tabs.Panel value="antenna-maintenance">
                        <MaintenanceReports 
                            location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            type="antenna" 
                            maintenanceReports={maintenanceReports} 
                            setMaintenanceReports={setMaintenanceReports} />
                    </Tabs.Panel>
                    <Tabs.Panel value="antenna-connections">
                        <AntennaLinks 
                            location={userContext?.role === 'ADMIN' ? userContext.location._id : location}
                            links={antennaLinks}
                            setLinks={setAntennaLinks} />
                    </Tabs.Panel>
                </Box>
            </Tabs>
        </>
    );}
