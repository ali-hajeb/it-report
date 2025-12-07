import { ITableViewField } from "@/src/Components/TableView";
import { IMaintenanceReportPopulated } from "@/src/lib/module/common/types";

export const filters = {
    deviceName: 'براساس نام دستگاه',
    operation: 'براساس نوع عملیات',
    operator: 'براساس انجام‌دهنده',
}

export const maintenanceReportSchemaFields: ITableViewField<IMaintenanceReportPopulated>[] = [
    {
        key: "deviceName",
        type: 'none',
        title: "نام دستگاه",
        alt: "نام اختصاصی یا کد داخلی دستگاه",
    },
    // {
    //     key: "deviceType",
    //     type: 'select',
    //     title: "نوع دستگاه",
    //     options: [
    //         { value: 'antenna', label: 'آنتن' },
    //         { value: 'router', label: 'روتر' },
    //         { value: 'server', label: 'سرور' },
    //         { value: 'switch', label: 'سوئیچ' },
    //         { value: 'other', label: 'سایر' },
    //     ],
    //     alt: "آنتن، روتر، سوییچ، ..."
    // },
    {
        key: "location",
        type: 'none',
        title: "مرکز",
        role: 'MANAGER',
        alt: "برند و مدل دقیق تجهیز"
    },
    {
        key: "date",
        type: 'none',
        title: "تاریخ",
        alt: "تاریخ انجام"
    },
    {
        key: "operation",
        type: 'select',
        options: [
            {value: 'checking', label: 'بازرسی'},
            {value: 'setting', label: 'تنظیم'},
            {value: 'changing', label: 'تعویض'},
            {value: 'debugging', label: 'عیب یابی'},
        ],
        title: "نوع عملیات",
        alt: "بازرسی، تنظیم، تعویض، عیب یابی"
    },
    {
        key: "operator",
        type: 'text',
        title: "انجام دهنده",
        alt: "نام فرد انجام دهنده"
    },
    {
        key: "desc",
        type: 'text',
        title: "توضیحات",
        alt: "توضیحات و نتیجه بازرسی"
    },
    {
        key: "replacements",
        type: 'text',
        title: "قطعات تعویض شده",
        alt: "نام قطعات تعویض شده"
    },
];
