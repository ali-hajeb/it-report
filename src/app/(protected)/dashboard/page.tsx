'use client'
import { useContext } from "react";
import { Box, Card, DefaultMantineColor, Flex, Grid, Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import UserContext from "@/src/Contexts/UserContext";
import { IconAntenna, IconBuildingHospital, IconRouter, IconServer, IconServer2 } from "@tabler/icons-react";
import ReportCard from "@/src/Components/ReportCard";
import { UserRole } from "@/src/lib/module/user";
import ManagerDashboard from "@/src/Containers/MainReportDashboard/ManagerDashboard";
import InfrastructureMap from "@/src/Containers/MapPanel";
import AdminDashboard from "@/src/Containers/MainReportDashboard/AdminDashboard";
// import { COLORS } from "@/src/Constants/colors";

interface IReportCard {
    color: DefaultMantineColor;
    role: UserRole;
    name: string;
    desc?: string;
    icon?: React.ReactElement;
    info: {
        title: string | React.ReactElement;
        content: string | React.ReactElement;
        type: 'string' | 'jsx';
    }[]
}

export default function DashboardPage() {
    const theme = useMantineTheme();
    const userContext = useContext(UserContext);
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
