'use client'
import React, { useRef, useState } from 'react';
import { Box, Button, Flex, Group, Select, TextInput } from '@mantine/core';
import { IconZoom } from '@tabler/icons-react';


export interface SearchBoxProps {
    filterFields: Record<string, string>
    searchHandler: (search: Record<string, string>) => void;
}

export default function SearchBox({filterFields, searchHandler}: SearchBoxProps) {
    const [searchStr, setSearchStr] = useState<string>('');
    const [filter, setFilter] = useState<string | null>(null);
    const fields = useRef(Object.values(filterFields));

    const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const field = Object.keys(filterFields).find((key: string) => filterFields[key] === filter);
        if (field) {
            const search = {[field]: searchStr};
            searchHandler(search);
        }
    }

    const onResetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearchStr('');
        setFilter(null)
        searchHandler({});
    }

    return (
        <form onSubmit={onSearchHandler} style={{flexGrow: 1}}>
        <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            // justify={{ sm: 'space-between' }}
            align={{base: 'stretch'}}>
            <Box style={{flexGrow: 4}}>
                <TextInput
                    placeholder='متن جستجو'
                    value={searchStr}
                    onChange={(e) => setSearchStr(e.currentTarget.value)} />
            </Box>
            <Box style={{flexGrow: 1}}>
                <Select data={fields.current} placeholder='نوع فیلتر' value={filter} onChange={setFilter} />
            </Box>
            <Group wrap='nowrap'>
                <Button type='submit'><IconZoom size={20} color='white' /></Button>
                <Button onClick={onResetHandler} type='reset' variant='subtle'>بازنشانی</Button>
            </Group>
        </Flex>
        </form>
    );
}
