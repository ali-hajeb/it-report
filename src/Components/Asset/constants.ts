import { DeviceStatus, IAssetPopulated } from "@/src/lib/module/common/types"
import { ITableViewField } from "../TableView"

export const filters = {
    unit: 'براساس نام واحد',
    operator: 'براساس مسئول',
    user: 'براساس کاربر',
    computerName: 'براساس نام سیستم',
}

export const DEVICE_STATUS: { value: DeviceStatus; label: string }[] = [
    { value: 'عالی', label: 'عالی'},
    { value: 'خوب', label: 'خوب'},
    { value: 'متوسط', label: 'متوسط'},
    { value: 'ضعیف', label: 'ضعیف'},
    { value: 'N/A', label: 'N/A' }
];

export const assetSchemaFields: ITableViewField<IAssetPopulated>[] = [
    { key: 'location',       type: 'none',    title: 'مرکز',         alt: '', viewCol: true },
    { key: 'unit',           type: 'text',    title: 'واحد',      alt: '', viewCol: true },
    { key: 'operator',       type: 'text',    title: 'مسئول',          alt: '', viewCol: true },
    { key: 'user',           type: 'text',    title: 'کاربر',          alt: '', viewCol: true },
    { key: 'computerName',   type: 'text',    title: 'نام سیستم',       alt: 'Computer Name', viewCol: true },
    { key: 'case',           type: 'text',    title: 'کیس',            alt: '', viewCol: false },
    { key: 'caseStatus',     type: 'select',  title: 'وضعیت کیس', options: DEVICE_STATUS,          alt: '', viewCol: false },
    { key: 'caseType',       type: 'text',  title: 'نوع کیس',        alt: '', viewCol: false },
    { key: 'monitor',        type: 'text',    title: 'نمایشگر',         alt: '', viewCol: false },
    { key: 'monitorStatus',  type: 'select',  title: 'وضعیت نمایشگر',options: DEVICE_STATUS,          alt: '', viewCol: false },
    { key: 'cmDifference',   type: 'text',    title: 'اختلاف C & M',   alt: '', viewCol: false },
    { key: 'laptop',         type: 'text',    title: 'لپ‌تاپ',          alt: '', viewCol: false },
    { key: 'laptopModel',    type: 'text',    title: 'مدل لپ‌تاپ',      alt: '', viewCol: false },
    { key: 'laptopStatus',   type: 'select',  title: 'وضعیت لپ‌تاپ',options: DEVICE_STATUS,          alt: '', viewCol: false },
    { key: 'tablet',         type: 'text',    title: 'تبلت',          alt: '', viewCol: false },
    { key: 'tabletModel',    type: 'text',    title: 'مدل تبلت',     alt: '', viewCol: false },
    { key: 'tabletStatus',   type: 'select',  title: 'وضعیت تبلت',options: DEVICE_STATUS,          alt: '', viewCol: false },
    { key: 'mobile',         type: 'text',    title: 'موبایل',          alt: '', viewCol: false },
    { key: 'mobileStatus',   type: 'select',  title: 'وضعیت موبایل',options: DEVICE_STATUS,          alt: '', viewCol: false },
    { key: 'printer',        type: 'text',    title: 'چاپگر',          alt: '', viewCol: false },
    { key: 'printerType',    type: 'text',  title: 'نوع چاپگر',            alt: 'رنگی، سیاه و سفید و...', viewCol: false },
    { key: 'printerModel',   type: 'text',    title: 'مدل چاپگر',      alt: '', viewCol: false },
    { key: 'scanner',        type: 'text',    title: 'اسکنر',          alt: '', viewCol: false },
    { key: 'scannerModel',   type: 'text',    title: 'مدل اسکنر',      alt: '', viewCol: false },
    { key: 'scannerType',    type: 'text',  title: 'نوع اسکنر',            alt: '', viewCol: false },
    { key: 'barcodeReader',  type: 'text',    title: 'بارکدخوان',      alt: '', viewCol: false },
    { key: 'token',          type: 'text',    title: 'توکن',           alt: '', viewCol: false },
    { key: 'antivirus',      type: 'text',    title: 'آنتی ویروس',     alt: '', viewCol: false },
    { key: 'os',             type: 'text',  title: 'سیستم عامل',     alt: '', viewCol: false },
    { key: 'desc',           type: 'text',    title: 'توضیحات',        alt: '', viewCol: false },]
