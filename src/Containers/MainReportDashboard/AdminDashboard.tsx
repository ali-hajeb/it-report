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

export default function AdminDashboard() {
    const theme = useMantineTheme();
    const [info, setInfo] = useState<IManagerInfo>();
    const [isLoading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        axiosInstance.get('/dashboard')
            .then(res => {
                if (res.data.info) {
                    setInfo(res.data.info);
                    console.log(res.data.info);
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
        <Grid.Col span={{base: 12, md: 3, lg: 3, xl: 3}}>
            <ReportCard
                color={theme.colors[colors[0]]} 
                icon={<IconServer size={48} color={theme.colors[colors[0]][6]} />}
                info={[
                    {title: `${info?.servers} عدد`, content: '', type: 'string'},
                ]}
                name={'سرور'} 
            />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 3, lg: 3, xl: 3}}>
            <ReportCard
                color={theme.colors[colors[1]]} 
                icon={<IconRouter size={48} color={theme.colors[colors[1]][6]} />}
                info={[
                    {title: `${info?.servers} عدد`, content: '', type: 'string'},
                ]}
                name={'روتر'} 
            />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 3, lg: 3, xl: 3}}>
            <ReportCard
                color={theme.colors[colors[2]]} 
                icon={<IconServer2 size={48} color={theme.colors[colors[2]][6]} />}
                info={[
                    {title: `${info?.servers} عدد`, content: '', type: 'string'},
                ]}
                name={'سوئیچ'} 
            />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 3, lg: 3, xl: 3}}>
            <ReportCard
                color={theme.colors[colors[3]]} 
                icon={<IconAntenna size={48} color={theme.colors[colors[3]][6]} />}
                info={[
                    {title: `${info?.servers} عدد`, content: '', type: 'string'},
                ]}
                name={'آنتن'} 
            />
        </Grid.Col>
        </>)
}
