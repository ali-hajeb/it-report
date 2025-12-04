'use client'
import ReportCard from "@/src/Components/ReportCard";
import axiosInstance from "@/src/config/axios";
import { COLORS } from "@/src/Constants/colors";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { Grid, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { IManagerInfo } from "./types";
import { IconAntenna, IconRouter, IconServer, IconServer2 } from "@tabler/icons-react";
import { arrayShuffle } from "@/src/utils/arrayShuffle";

const colors = arrayShuffle(COLORS);

export default function ManagerDashboard() {
    const theme = useMantineTheme();
    const [info, setInfo] = useState<IManagerInfo[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        axiosInstance.get('/dashboard')
            .then(res => {
                if (res.data.info) {
                    setInfo(res.data.info);
                }
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])
    return (<>
        {info.map((loc, i) => { 
            return <Grid.Col key={i} span={{base: 12, md: 6, lg: 3, xl: 3}}>
                <ReportCard
                    color={theme.colors[colors[i]]} 
                    info={[
                        {icon: <IconServer size={16} color="white"/>, title: 'سرور', content: loc.servers, type: 'string'},
                        {icon: <IconRouter size={16} color="white"/>, title: 'روتر', content: loc.routers, type: 'string'},
                        {icon: <IconServer2 size={16} color="white"/>, title: 'سوئیچ', content: loc.switches, type: 'string'},
                        {icon: <IconAntenna size={16} color="white"/>, title: 'آنتن', content: loc.antennas, type: 'string'},
                    ]}
                    name={loc.name} 
                    key={loc._id} />
            </Grid.Col>})}
    </>);
}
