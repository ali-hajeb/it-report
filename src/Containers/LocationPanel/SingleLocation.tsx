'use client'
import { useEffect, useState } from "react";
import { Button, Flex, Tabs, Title } from "@mantine/core";
import { Params } from "next/dist/server/request/params";
import { useParams, useRouter } from "next/navigation";
import { IconAntenna, IconChevronRight, IconDeviceLaptop, IconRouter, IconServer, IconServer2 } from "@tabler/icons-react";
import { ILocation, locationActions } from "@/src/lib/module/location";
import AntennaPanel from "@/src/Containers/AntennaPanel";
import RouterPanel from "@/src/Containers/RouterPanel";
import ServerPanel from "@/src/Containers/ServerPanel";
import SwitchPanel from "@/src/Containers/SwitchPanel";
import AssetPanel from "@/src/Containers/AssetPanel";
import classes from './panel.module.css';

interface IPageParams extends Params {
    id: string;
}

export default function SingleLocationPanel() {
    const { id } = useParams<IPageParams>();
    const router = useRouter();
    
    const [activeTab, setActiveTab] = useState<string | null>('antenna');
    const [location, setLocation] = useState<ILocation>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            locationActions.getLocationById(id)
            .then((res) => {
                    console.log(res.data);
                    setLocation(res.data.location);
                })
            .catch((error) => {
                    console.error(error);
                })
            .finally(() => {
                    setLoading(false);
                });
        }
    }, [])

    const btnBackOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.back();
    }

    return <>
        <Flex align={'center'}>
            <Button variant="transparent" c={'dark'} onClick={btnBackOnClickHandler}>
                <IconChevronRight size={32} />
            </Button>
            <Title>{location?.name}</Title>
        </Flex>
        <Tabs 
            mt={'md'}
            value={activeTab}
            onChange={setActiveTab}
            variant="outline">
            <Tabs.List>
                <Tabs.Tab value="antenna" leftSection={<IconAntenna size={16} />}>آنتن‌ها</Tabs.Tab>
                <Tabs.Tab value="router" leftSection={<IconRouter size={16} />}>روترها</Tabs.Tab>
                <Tabs.Tab value="server" leftSection={<IconServer size={16} />}>سرورها</Tabs.Tab>
                <Tabs.Tab value="switch" leftSection={<IconServer2 size={16} />}>سوئیچ‌ها</Tabs.Tab>
                <Tabs.Tab value="device" leftSection={<IconDeviceLaptop size={16} />}>سیستم‌ها</Tabs.Tab>
            </Tabs.List>

            {!isLoading && <>
                <Tabs.Panel value="antenna" className={classes.tabPane}> 
                    <AntennaPanel location={location?._id}/>
                </Tabs.Panel>
                <Tabs.Panel value="router" className={classes.tabPane}>
                    <RouterPanel location={location?._id} />
                </Tabs.Panel>
                <Tabs.Panel value="server" className={classes.tabPane}>
                    <ServerPanel location={location?._id} />
                </Tabs.Panel>
                <Tabs.Panel value="switch" className={classes.tabPane}>
                    <SwitchPanel location={location?._id} />
                </Tabs.Panel>
                <Tabs.Panel value="device" className={classes.tabPane}>
                    <AssetPanel location={location?._id} />
                </Tabs.Panel>
            </>}
        </Tabs>
    </>
}
