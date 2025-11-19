'use client'
import { useContext } from "react";
import { Card, DefaultMantineColor, Flex, Grid, Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import UserContext from "@/src/Contexts/UserContext";
import { IconAntenna, IconBuildingHospital, IconRouter, IconServer, IconServer2 } from "@tabler/icons-react";
import ReportCard from "@/src/Components/ReportCard";
import { UserRole } from "@/src/lib/module/user";
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
const cards: IReportCard[] = [
    {
        name: 'بیمارستان شهیدزاده',
        color: 'grape',
        role: 'MANAGER',
        info: [
            {
                title: <Group gap={"xs"} align="center">
                    <IconAntenna size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>آنتن‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سرورها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconRouter size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>روترها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer2 size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سوییچ‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
        ]
    },
    {
        name: 'بیمارستان ولیعصر',
        color: 'orange',
        role: 'MANAGER',
        info: [
            {
                title: <Group gap={"xs"} align="center">
                    <IconAntenna size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>آنتن‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سرورها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconRouter size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>روترها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer2 size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سوییچ‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
        ]
    },
    {
        name: 'بیمارستان فریده اشرفی',
        color: 'lime',
        role: 'MANAGER',
        info: [
            {
                title: <Group gap={"xs"} align="center">
                    <IconAntenna size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>آنتن‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سرورها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconRouter size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>روترها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer2 size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سوییچ‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
        ]
    },
    {
        name: 'مرکز بهداشت تشان',
        color: 'red',
        role: 'MANAGER',
        info: [
            {
                title: <Group gap={"xs"} align="center">
                    <IconAntenna size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>آنتن‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سرورها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconRouter size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>روترها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
            {
                title: <Group gap={"xs"} align="center">
                    <IconServer2 size={16} color="white"/>
                    <Text c={'white'} size="md" fw={'bold'}>سوییچ‌ها</Text>
                </Group>,
                content:<Text c={'white'} size="xs">۳ عدد</Text>, 
                type: 'jsx',
            },
        ]
    },
];

export default function DashboardPage() {
    const theme = useMantineTheme();
    const userContext = useContext(UserContext);
    return <>
        <Title order={3}>{userContext?.firstName} عزیز، خوش آمدید!</Title>
        <Text size="xs" c={'gray'}>{userContext?.location?.name}</Text>
        <Grid mt={'lg'}>
            {
                cards.map((c, i) => 
                userContext?.role === 'MANAGER' && 
                    <Grid.Col key={i} span={{base: 12, md: 12, lg: 6, xl: 6}}>
                            <ReportCard name={c.name} color={theme.colors[c.color]} info={c.info} />
                    </Grid.Col>)
            }
        </Grid>
    </>
}
