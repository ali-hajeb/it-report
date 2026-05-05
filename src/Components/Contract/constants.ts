import { IContract } from "@/src/lib/module/contracts"
import { ITableViewField } from "../TableView"

export const filters = {
    companyName: 'براساس نام شرکت',
    softwareName: 'براساس نام نرم‌افزار',
    softwareCategory: 'براساس نوع سامانه',
    unit: 'براساس نام واحد',
    type: 'براساس وضعیت',
}

export const contractSchemaFields: ITableViewField<IContract>[] = [
    {
        key: 'companyName',
        alt: '',
        title: 'نام شرکت توسعه نرم‌افزار',
        type: 'text',
        viewCol: true,
    },
    {
        key: 'softwareName',
        alt: '',
        title: 'نام نرم‌افزار',
        type: 'text',
        viewCol: true,
    },
    {
        key: 'softwareCategory',
        alt: '',
        title: 'نوع سامانه',
        type: 'text',
        viewCol: true,
    },
    {
        key: 'unit',
        alt: '',
        title: 'نام واحد',
        type: 'text',
        viewCol: true,
    },
    {
        key: 'type',
        alt: '',
        title: 'نوع قرارداد',
        type: 'text',
        viewCol: true,
    },
]
