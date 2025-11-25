import { toFarsiNumber } from '@/src/utils/number';
import { Modal, Table } from '@mantine/core'
import { PropsWithChildren } from 'react';
import { IBaseModelObject, ITableViewField } from './types';

export interface TableViewModalProps<T extends IBaseModelObject> extends PropsWithChildren {
    fields?: ITableViewField<T>[];
    customFieldValue?: (data: T, field: keyof T) => string | React.ReactElement | null
    opened: boolean;
    close: () => void;
    closeHandler: () => void;
    editMode: string | null;
    title: string;
    viewMode?: T | null;
}
export default function TableViewModal<T extends IBaseModelObject>({
    opened,
    close,
    closeHandler,
    editMode,
    title,
    viewMode,
    fields,
    customFieldValue,
    children
}: TableViewModalProps<T>) {
    const modalOnCloseHandler = () => {
        closeHandler();
        // close();
    }
    return <Modal
        opened={opened} 
        onClose={modalOnCloseHandler}
        title={viewMode ? 'نمایش' : editMode ? `ویرایش ${title}` : `افزودن ${title}`}>
        { viewMode && fields && customFieldValue ? <Table variant='vertical'>
            <Table.Tbody>
                {
                    fields.map(field =>  <Table.Tr key={field.key.toString()} >
                        <Table.Th 
                            fz={'xs'}
                            key={`${field.key.toString()}-${field.title}`}
                            id={field.key.toString()}
                            ta={'center'}
                            title={field.alt}>
                            {field.title}
                        </Table.Th>
                        <Table.Td 
                            fz={'xs'}
                            ta={'center'}
                            title={field.alt}>
                            {customFieldValue(viewMode, field.key)}
                        </Table.Td>
                    </Table.Tr>)
                }
            </Table.Tbody>
        </Table> : children}
    </Modal>
}
