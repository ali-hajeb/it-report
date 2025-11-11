import { Modal } from '@mantine/core'
import { PropsWithChildren } from 'react';

export interface TableViewModalProps extends PropsWithChildren {
    opened: boolean;
    close: () => void;
    closeHandler: () => void;
    editMode: string | null;
    title: string;
}
export default function TableViewModal({
    opened,
    close,
    closeHandler,
    editMode,
    title,
    children
}: TableViewModalProps) {
    const modalOnCloseHandler = () => {
        closeHandler();
        // close();
    }
    return <Modal
        opened={opened} 
        onClose={modalOnCloseHandler}
        title={editMode ? `ویرایش ${title}` : `افزودن ${title}`}>
        {children}
    </Modal>
}
