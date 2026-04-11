import { DeviceStatus, IBlogPopulated } from "@/src/lib/module/common/types"
import { ITableViewField } from "../TableView"

export const filters = {
    user: 'براساس کاربر',
    title: 'براساس عنوان',
}

export const blogSchemaFields: ITableViewField<IBlogPopulated>[] = [
    { 
        key: 'title',
        type: 'text',
        title: 'عنوان',
        alt: '', 
        viewCol: true 
    },
    { 
        key: 'desc',
        type: 'textarea',
        title: 'شرح',
        alt: '', 
        viewCol: false 
    },
    { 
        key: 'authorName',
        type: 'text',
        title: 'نویسنده',
        alt: '', 
        viewCol: false,
    },
    { 
        key: 'file',
        type: 'file',
        title: 'فایل',
        alt: '', 
        viewCol: false,
    },
    { 
        key: 'author',
        type: 'none',
        title: 'نویسنده',
        alt: '', 
        viewCol: false,
    },
    { 
        key: 'location',
        type: 'none',
        title: 'مرکز',
        alt: '', 
        viewCol: true,
    },
]
