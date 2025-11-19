import React from 'react';
import { Card, Flex, Group, MantineColorsTuple, Stack, Text } from '@mantine/core';
import { IconBuildingHospital } from '@tabler/icons-react';

export interface ReportCardProps {
    color: MantineColorsTuple;
    name: string;
    desc?: string;
    icon?: React.ReactElement;
    info: {
        title: string | React.ReactElement;
        content: string | React.ReactElement;
        type: 'string' | 'jsx';
    }[]
}

export default function ReportCard({
    color,
    name,
    desc,
    icon,
    info
}: ReportCardProps) {
    return <Card 
        shadow="lg"
        padding={'xs'} 
        radius={'md'}
        style={{background: `linear-gradient(30deg, ${color[4]} 0%, ${color[9]} 100%)` }}>
        <Stack>
            <Flex gap={'lg'} align={'center'}>
                <Flex align={'center'} justify={'center'} bg={color[1]} w={64} h={64} bdrs={'50%'}>
                    {
                        icon || <IconBuildingHospital size={48} color={color[6]}/>
                    }
                </Flex>
                <Stack gap={0}>
                    <Text c={'white'} size="xl" fw={'bold'}>{name}</Text>
                    {desc && <Text c={'white'} size="md">{desc}</Text>}
                </Stack>
            </Flex>
            <Stack gap={2} pb={'md'}>
                {
                    info && info.length && 
                        info.map((item, i) => <Group wrap='nowrap' key={i} mr={64} px={'md'}>
                            {item.type === 'string' ? <Text c={'white'} size="md" fw={'bold'}>{item.title}</Text> : item.title}
                            {item.type === 'string' ? <Text c={'white'} size="xs">{item.content}</Text> : item.content}
                        </Group>)
                }
            </Stack>
        </Stack>
    </Card>
}
