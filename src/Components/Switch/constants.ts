import { ISwitch, ISwitchBackup, ISwitchPort } from "@/src/lib/module/switch";
import { ITableViewField } from "@/src/Components/TableView";
import { ISwitchBackupPopulated, ISwitchPopulated, ISwitchPortPopulated } from "@/src/lib/module/common/types";

export const filters = {
    switchName: 'براساس نام روتر',
}

export const switchSchemaFields: ITableViewField<ISwitchPopulated>[] = [
    {
        key: 'switchName',
        type: 'text',
        title: 'نام سوئیچ',
        alt: 'نام شبکه‌ای یا برچسب فیزیکی روی دستگاه',
        viewCol: true,
    },
    {
        key: 'brandModel',
        type: 'text',
        title: 'برند / مدل',
        alt: 'برند و مدل دقیق دستگاه',
        viewCol: true,
    },
    {
        key: 'deviceType',
        type: 'text',
        title: 'نوع دستگاه',
        alt: 'مدیریتی یا غیرمدیریتی',
        viewCol: true,
    },
    {
        key: 'portCount',
        type: 'number',
        title: 'تعداد پورت‌ها',
        alt: 'کل تعداد پورت‌های شبکه',
        viewCol: false,
    },
    {
        key: 'managementIP',
        type: 'text',
        title: 'IP مدیریتی',
        alt: 'آدرس IP برای دسترسی از طریق SSH، Web یا Telnet',
        viewCol: true,
    },
    {
        key: 'activeVlans',
        type: 'tags',
        title: 'VLANهای فعال',
        alt: 'لیست VLANهای پیکربندی‌شده',
        viewCol: false,
    },
    {
        key: 'uplinkPorts',
        type: 'tags',
        title: 'لینک Uplink',
        alt: 'پورت‌هایی که به سایر سوئیچ‌ها یا روترها متصل‌اند',
        viewCol: true,
    },
    {
        key: 'role',
        type: 'text',
        title: 'نقش',
        alt: 'جایگاه دستگاه در توپولوژی شبکه (Access، Core و...)',
        viewCol: true,
    },
    {
        key: 'connectedAntenna',
        type: 'none',
        title: 'آنتن متصل',
        alt: 'آنتن متصل',
        viewCol: true,
    },
    {
        key: "coordination",
        type: 'text',
        title: "مختصات مکانی",
        alt: "مختصات دقیق مکان روی نقشه",
        viewCol: false,
    },
    {
        key: 'currentStatus',
        type: 'select',
        title: 'وضعیت فعلی',
        alt: 'فعال، رزرو یا خاموش',
        viewCol: true,
        options: [
            { label: 'فعال', value: 'Active' },
            { label: 'خاموش', value: 'Offline' },
        ],
    },
    {
        key: 'notes',
        type: 'text',
        title: 'توضیحات',
        alt: 'یادداشت‌ها یا تنظیمات خاص',
        viewCol: false,
    },
    {
        key: 'poe',
        type: 'check',
        title: 'PoE',
        alt: 'مشخص می‌کند آیا پورت‌ها برق PoE می‌دهند یا نه',
        viewCol: true,
    },
];

export const switchBackupSchemaFields: ITableViewField<ISwitchBackupPopulated>[] = [
    {
        key: 'switchName',
        alt: 'نام دستگاه',
        type: 'none',
        title: 'روتر'
    },
    {
        key: 'lastBackupDate',
        alt: '1404/01/01',
        type: 'none',
        title: 'تاریخ آخرین پشتیبان‌گیری'
    },
    {
        key: 'storage',
        alt: 'محل و آدرس ذخیره‌ی پشتیبان',
        type: 'text',
        title: 'محل ذخیره پشتیبان'
    },
    {
        key: 'operator',
        alt: 'نام مسئول پشتیبان‌گیری',
        type: 'text',
        title: 'مسئول پشتیبان‌گیری'
    },
    {
        key: 'type',
        alt: 'خودکار / دستی',
        type: 'select',
        title: 'روش پشتیبان‌گیری',
        options: [
            { value: 'Auto', label: 'خودکار' },
            { value: 'Manual', label: 'دستی' },
        ],
    },
    {
        key: 'desc',
        alt: '',
        type: 'text',
        title: 'توضیحات'
    },
];

export const switchPortSchemaFields: ITableViewField<ISwitchPortPopulated>[] = [
    {
        key: 'switchName',
        alt: '',
        type: 'text',
        title: 'نام سوئیچ'
    },
    {
        key: 'port',
        alt: '',
        type: 'number',
        title: 'شماره پورت'
    },
    {
        key: 'status',
        alt: '',
        type: 'select',
        title: 'شماره پورت',
        options: [
            { value: 'Up', label: 'فغال' },
            { value: 'Down', label: 'غیرفغال' },
        ],
    },
    {
        key: 'portType',
        title: 'نوع پورت',
        type: 'text',
        alt: 'Ethernet, Fiberm, SFP, ...'
    },
    {
        key: 'vlans',
        alt: '',
        type: 'tags',
        title: 'VLANهای تخصیص یافته'
    },
    {
        key: 'connectedDevice',
        alt: '',
        type: 'text',
        title: 'دستگاه متصل'
    },
    {
        key: 'connectedDeviceType',
        alt: '',
        type: 'text',
        title: 'نوع دستگاه متصل'
    },
    {
        key: 'desc',
        alt: '',
        type: 'text',
        title: 'توضیحات'
    },
];
