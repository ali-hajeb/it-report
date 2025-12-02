import { DeviceStatus, IAssetPopulated } from "@/src/lib/module/common/types"
import { ITableViewField } from "../TableView"

export const filters = {
    unit: 'براساس نام واحد',
    operator: 'براساس مسئول',
    user: 'براساس کاربر',
}

export const DEVICE_STATUS: { value: DeviceStatus; label: string }[] = [
    { value: 'A', label: 'عالی'},
    { value: 'B', label: 'خوب'},
    { value: 'C', label: 'متوسط'},
    { value: 'D', label: 'غیرقابل استفاده'},
    { value: 'N/A', label: 'N/A' }
];

export const assetSchemaFields: ITableViewField<IAssetPopulated>[] = [
    { key: 'location',       type: 'none',    title: 'معاونت',         alt: '', viewCol: true },
    { key: 'unit',           type: 'text',    title: 'واحد',      alt: '', viewCol: true },
    { key: 'operator',       type: 'text',    title: 'مسئول',          alt: '', viewCol: true },
    { key: 'user',           type: 'text',    title: 'کاربر',          alt: '', viewCol: true },
    { key: 'case',           type: 'text',    title: 'کیس',            alt: '', viewCol: true },
    { key: 'caseStatus',     type: 'select',  title: 'وضعیت کیس', options: DEVICE_STATUS,          alt: '', viewCol: true },
    { key: 'caseType',       type: 'text',  title: 'نوع کیس',        alt: '', viewCol: true },
    { key: 'monitor',        type: 'text',    title: 'نمایشگر',         alt: '', viewCol: true },
    { key: 'monitorStatus',  type: 'select',  title: 'وضعیت نمایشگر',options: DEVICE_STATUS,          alt: '', viewCol: true },
    { key: 'cmDifference',   type: 'text',    title: 'اختلاف C & M',   alt: '', viewCol: false },
    { key: 'laptop',         type: 'text',    title: 'لپ‌تاپ',          alt: '', viewCol: true },
    { key: 'laptopModel',    type: 'text',    title: 'مدل لپ‌تاپ',      alt: '', viewCol: true },
    { key: 'laptopStatus',   type: 'select',  title: 'وضعیت لپ‌تاپ',options: DEVICE_STATUS,          alt: '', viewCol: true },
    { key: 'tablet',         type: 'text',    title: 'تبلت',          alt: '', viewCol: true },
    { key: 'tabletModel',    type: 'text',    title: 'مدل تبلت',     alt: '', viewCol: true },
    { key: 'tabletStatus',   type: 'select',  title: 'وضعیت تبلت',options: DEVICE_STATUS,          alt: '', viewCol: true },
    { key: 'mobile',         type: 'text',    title: 'موبایل',          alt: '', viewCol: true },
    { key: 'mobileStatus',   type: 'select',  title: 'وضعیت موبایل',options: DEVICE_STATUS,          alt: '', viewCol: true },
    { key: 'printer',        type: 'text',    title: 'چاپگر',          alt: '', viewCol: true },
    { key: 'printerType',    type: 'text',  title: 'نوع چاپگر',            alt: 'رنگی، سیاه و سفید و...', viewCol: true },
    { key: 'printerModel',   type: 'text',    title: 'مدل چاپگر',      alt: '', viewCol: true },
    { key: 'scanner',        type: 'text',    title: 'اسکنر',          alt: '', viewCol: false },
    { key: 'scannerModel',   type: 'text',    title: 'مدل اسکنر',      alt: '', viewCol: false },
    { key: 'scannerType',    type: 'text',  title: 'نوع اسکنر',            alt: '', viewCol: false },
    { key: 'barcodeReader',  type: 'text',    title: 'بارکدخوان',      alt: '', viewCol: false },
    { key: 'token',          type: 'text',    title: 'توکن',           alt: '', viewCol: false },
    { key: 'antivirus',      type: 'text',    title: 'آنتی ویروس',     alt: '', viewCol: true },
    { key: 'os',             type: 'text',  title: 'سیستم عامل',     alt: '', viewCol: true },
    { key: 'desc',           type: 'text',    title: 'توضیحات',        alt: '', viewCol: false },]
