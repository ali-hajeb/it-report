'use client'
import { useContext, useEffect } from "react";
import { Box, Grid, Text, Title } from "@mantine/core";
import UserContext from "@/src/Contexts/UserContext";
import ManagerDashboard from "@/src/Containers/MainReportDashboard/ManagerDashboard";
import InfrastructureMap from "@/src/Containers/MapPanel";
import AdminDashboard from "@/src/Containers/MainReportDashboard/AdminDashboard";
import TopbarContext from "@/src/Contexts/TopbarContext";

export default function DashboardPage() {
    const userContext = useContext(UserContext);
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('داشبورد')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);

    return <>
        <Title order={3}>{userContext?.firstName} عزیز، خوش آمدید!</Title>
        <Text size="xs" c={'gray'}>{userContext?.location?.name}</Text>
        <Grid mt={'lg'}>
            {
                userContext?.role === 'MANAGER' ?
                    <ManagerDashboard />
                :
                    <AdminDashboard />
            }
        </Grid>
        <Box mt={"md"}>
            <Title order={4}>نقشه تجهیزات</Title>
            <InfrastructureMap />
        </Box>
    </>
}
