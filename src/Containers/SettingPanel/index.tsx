'use client'
import { useContext, useState } from "react"
import { IconBuildings, IconMapPin2, IconUsers } from '@tabler/icons-react';
import { Tabs } from '@mantine/core';
import UserContext from "@/src/Contexts/UserContext";


export default function SettingPanel() {
    const userContext = useContext(UserContext);
    const [activeTab, setActiveTab] = useState<string | null>(userContext?.role === 'MANAGER' ? 'locations' : 'units');

    return (
        <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
                {userContext?.role === 'MANAGER' && 
                    <Tabs.Tab value="locations" leftSection={<IconMapPin2 size={16} />}>مراکز تحت نظر</Tabs.Tab>
                }
                <Tabs.Tab value="units" leftSection={<IconBuildings size={16} />}>واحدها</Tabs.Tab>
                {userContext?.role === 'MANAGER' && 
                    <Tabs.Tab value="users" leftSection={<IconUsers size={16} />}>کاربران</Tabs.Tab>
                }
            </Tabs.List>

            {userContext?.role === 'MANAGER' && 
                <Tabs.Panel value="locations">
                    centers
                </Tabs.Panel>
            }
            <Tabs.Panel value="units">Second panel</Tabs.Panel>
            {userContext?.role === 'MANAGER' && 
                <Tabs.Panel value="users">Second panel</Tabs.Panel>
            }
        </Tabs>
    );
}
