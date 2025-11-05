import Link from 'next/link';
import type IMenuItem from './MenuList.types';
import { Box, Flex, Text } from '@mantine/core';
export interface MenuItemProps extends IMenuItem {
    active?: boolean
}

export default function MenuItem(item: MenuItemProps) {
    return (<Link key={item.id} href={item.href}>
        <Flex gap={'sm'} align={'center'}>
            <Flex 
                c={item.active ? 'white' : 'gray'}
                bdrs={'50%'}
                bg={item.active ? 'violet' : 'transparent'}
                p={'xs'}
                align={'center'}
                justify={'center'}>
                {item.icon}
            </Flex>
            <Box flex={2}><Text c={item.active ? 'black' : 'gray'}>{item.title}</Text></Box>
        </Flex>
    </Link>)
}
