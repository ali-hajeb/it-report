import { Button, Flex } from "@mantine/core";
import { IconPlus, IconPrinter } from "@tabler/icons-react";
import SearchBox from "../SearchBox";

export interface TableViewTopBarProps {
    reportHandler: () => void;
    newItem: () => void;
    title: string;
    filters: Record<string, string>;
    searchHandler: (query: Record<string, string>) => void;
}

export default function TopBar({
    reportHandler,
    newItem,
    title,
    filters,
    searchHandler
}: TableViewTopBarProps) {
    const btnNewOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        newItem();
    }

    const btnReportOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        reportHandler();
    }
    return (
        <Flex 
            direction={{ base: 'column', sm: 'row' }}
            my={'md'} 
            gap={'md'}>
            <Button 
                variant="filled"
                rightSection={<IconPrinter size={16}/>}
                onClick={btnReportOnClickHandler}>
                چاپ گزارش
            </Button>
            <Button 
                variant="outline"
                rightSection={<IconPlus size={16}/>}
                onClick={btnNewOnClickHandler}>
                {`افزودن ${title}`}
            </Button>
            <SearchBox filterFields={filters} searchHandler={searchHandler} />
        </Flex>
    );
}
