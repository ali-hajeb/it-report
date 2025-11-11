'use client'
import { useState } from "react"
import { IconAntenna, IconCloudDataConnection, IconSettingsCog } from '@tabler/icons-react';
import { Box, Tabs, Title } from '@mantine/core';
import AntennaList from "@/src/Components/Antenna/AntennaList";


export interface AntennaPannelProps {
    location?: string;
}

export default function AntennaPanel({
    location
}: AntennaPannelProps) {
    const [activeTab, setActiveTab] = useState<string | null>('antenna-list');

    return (
        <>
            <Title>آنتن‌ها</Title>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="antenna-list" leftSection={<IconAntenna size={16} />}>فهرست آنتن‌ها</Tabs.Tab>
                    <Tabs.Tab value="antenna-maintenance" leftSection={<IconSettingsCog size={16} />}>تاریخچه نگهداری و سرویس</Tabs.Tab>
                    <Tabs.Tab value="antenna-connections" leftSection={<IconCloudDataConnection size={16} />}>لینک‌ها و اتصالات</Tabs.Tab>
                </Tabs.List>

                <Box px='xs'>
                    <Tabs.Panel value="antenna-list">
                        <AntennaList location={location} />
                    </Tabs.Panel>
                    <Tabs.Panel value="antenna-maintenance">Second panel</Tabs.Panel>
                    <Tabs.Panel value="antenna-connections">Second panel</Tabs.Panel>
                </Box>
            </Tabs>
        </>
    );}
