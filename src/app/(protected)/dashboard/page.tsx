'use client'
import { useContext } from "react";
import { Card, Flex, Grid, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import UserContext from "@/src/Contexts/UserContext";
import { IconAntenna, IconBuildingHospital, IconRouter, IconServer, IconServer2 } from "@tabler/icons-react";

export default function DashboardPage() {
    const theme = useMantineTheme();
    const userContext = useContext(UserContext);
    return <>
        <Title order={3}>{userContext?.firstName} عزیز، خوش آمدید!</Title>
        <Text size="xs" c={'gray'}>{userContext?.location?.name}</Text>
        <Grid mt={'lg'}>
            {
                userContext?.role === 'MANAGER' && 
                    <Grid.Col span={{base: 6, md: 4, lg: 3, xl: 2}}>
                        <Card 
                            shadow="md"
                            padding={'xs'} 
                            radius={'md'}
                            style={{background: `linear-gradient(60deg, ${theme.colors.cyan[6]} 0%, ${theme.colors.cyan[7]} 100%)` }}>
                            <Flex gap={'lg'} align={'center'}>
                                <Flex align={'center'} justify={'center'} bg={'cyan.1'} w={64} h={64} bdrs={'50%'}>
                                    <IconBuildingHospital size={48} color={theme.colors.cyan[6]}/>
                                </Flex>
                                <Stack gap={0}>
                                    <Text c={'white'} size="xl" fw={'bold'}>مراکز درمانی</Text>
                                    <Text c={'white'} size="md">۵ مرکز</Text>
                                </Stack>
                            </Flex>
                        </Card>
                    </Grid.Col>
            }
            <Grid.Col span={{base: 6, md: 4, lg: 3, xl: 2}}>
                <Card 
                    shadow="md"
                    padding={'xs'} 
                    radius={'md'}
                    style={{background: `linear-gradient(60deg, ${theme.colors.lime[6]} 0%, ${theme.colors.lime[7]} 100%)` }}>
                    <Flex gap={'lg'} align={'center'}>
                        <Flex align={'center'} justify={'center'} bg={'lime.1'} w={64} h={64} bdrs={'50%'}>
                            <IconAntenna size={48} color={theme.colors.lime[6]}/>
                        </Flex>
                        <Stack gap={0}>
                            <Text c={'white'} size="xl" fw={'bold'}>آنتن‌ها</Text>
                            <Text c={'white'} size="md">۵ عدد</Text>
                        </Stack>
                    </Flex>
                </Card>
            </Grid.Col>
            <Grid.Col span={{base: 6, md: 4, lg: 3, xl: 2}}>
                <Card 
                    shadow="md"
                    padding={'xs'} 
                    radius={'md'}
                    style={{background: `linear-gradient(60deg, ${theme.colors.orange[6]} 0%, ${theme.colors.orange[7]} 100%)` }}>
                    <Flex gap={'lg'} align={'center'}>
                        <Flex align={'center'} justify={'center'} bg={'orange.1'} w={64} h={64} bdrs={'50%'}>
                            <IconServer size={48} color={theme.colors.orange[6]}/>
                        </Flex>
                        <Stack gap={0}>
                            <Text c={'white'} size="xl" fw={'bold'}>سرورها</Text>
                            <Text c={'white'} size="md">۳ عدد</Text>
                        </Stack>
                    </Flex>
                </Card>
            </Grid.Col>
            <Grid.Col span={{base: 6, md: 4, lg: 3, xl: 2}}>
                <Card 
                    shadow="md"
                    padding={'xs'} 
                    radius={'md'}
                    style={{background: `linear-gradient(60deg, ${theme.colors.grape[6]} 0%, ${theme.colors.grape[7]} 100%)` }}>
                    <Flex gap={'lg'} align={'center'}>
                        <Flex align={'center'} justify={'center'} bg={'grape.1'} w={64} h={64} bdrs={'50%'}>
                            <IconServer2  size={48} color={theme.colors.grape[6]}/>
                        </Flex>
                        <Stack gap={0}>
                            <Text c={'white'} size="xl" fw={'bold'}>سوییچ‌ها</Text>
                            <Text c={'white'} size="md">۵ عدد</Text>
                        </Stack>
                    </Flex>
                </Card>
            </Grid.Col>
            <Grid.Col span={{base: 6, md: 4, lg: 3, xl: 2}}>
                <Card 
                    shadow="lg"
                    padding={'xs'} 
                    radius={'md'}
                    style={{background: `linear-gradient(60deg, ${theme.colors.pink[6]} 0%, ${theme.colors.pink[7]} 100%)` }}>
                    <Flex gap={'lg'} align={'center'}>
                        <Flex align={'center'} justify={'center'} bg={'pink.1'} w={64} h={64} bdrs={'50%'}>
                            <IconRouter  size={48} color={theme.colors.pink[6]}/>
                        </Flex>
                        <Stack gap={0}>
                            <Text c={'white'} size="xl" fw={'bold'}>روترها</Text>
                            <Text c={'white'} size="md">۵ عدد</Text>
                        </Stack>
                    </Flex>
                </Card>
            </Grid.Col>
        </Grid>
    </>
}
