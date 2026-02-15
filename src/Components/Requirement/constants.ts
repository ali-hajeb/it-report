import { RequirementStatus } from "@/src/lib/module/requirement";
import { ITableViewField } from "../TableView";
import { IRequirementPopulated } from "@/src/lib/module/common/types";

export const requirementStatusOptions: RequirementStatus[] = ['در حال بررسی', 'انجام شد', 'رد شد'];

export const filters = {
    unit: 'براساس نام واحد',
    user: 'براساس نام کاربر',
    requirement: 'براساس کالا',
    status: 'براساس وضعیت'
}

export const requirementSchemaFields: ITableViewField<IRequirementPopulated>[]  = [
    {
        key: 'location',
        type: 'none',
        title: 'مرکز',
        alt: '',
        viewCol: true 
    },
    { 
        key: 'unit',
        type: 'text',
        title: 'واحد',
        alt: '',
        viewCol: true
    },
    { 
        key: 'user',
        type: 'text',
        title: 'کاربر',
        alt: '',
        viewCol: true 
    },
    { 
        key: 'requirement',
        type: 'text',
        title: 'نام کالای مورد نیاز',
        alt: '',
        viewCol: true 
    },
    { 
        key: 'desc',
        type: 'text',
        title: 'مشخصات',
        alt: '',
        viewCol: true 
    },
    { 
        key: 'count',
        type: 'number',
        title: 'تعداد',
        alt: '',
        viewCol: true 
    },
    { 
        key: 'note',
        type: 'text',
        title: 'توضیحات',
        alt: '',
        viewCol: true 
    },
    { 
        key: 'status',
        type: 'none',
        title: 'وضعیت',
        alt: '',
        viewCol: true 
    },
];
