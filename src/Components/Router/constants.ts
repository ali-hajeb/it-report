import { IRouterBackupPopulated, IRouterInterfacePopulated, IRouterPopulated } from "@/src/lib/module/common/types";
import { ITableViewField } from "../TableView";

export const filters = {
    routerName: 'براساس نام روتر',
}

export const routerSchemaFields: ITableViewField<IRouterPopulated>[]  = [
    {
        key: 'name',
        type: 'text',
        title: 'نام روتر',
        alt: 'نام تعریف‌شده برای روتر در شبکه',
        viewCol: true,
    },
    {
        key: 'model',
        type: 'text',
        title: 'مدل / سری ساخت',
        alt: 'مدل دقیق دستگاه (مثل CCR1009 یا Cisco 2911)',
        viewCol: false,
    },
    {
        key: 'deviceType',
        type: 'select',
        title: 'نوع دستگاه',
        alt: 'فیزیکی یا مجازی',
        viewCol: false,
        options: [
            { label: 'فیزیکی', value: 'Physical' },
            { label: 'مجازی', value: 'Virtual' },
        ],
    },
    {
        key: 'brand',
        type: 'text',
        title: 'برند',
        alt: 'برند روتر (MikroTik, Cisco, Huawei, ...)',
        viewCol: false,
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
        key: 'os',
        type: 'text',
        title: 'سیستم‌عامل (OS)',
        alt: 'نام سیستم‌عامل (RouterOS، IOS، VRP و غیره)',
        viewCol: false,
    },
    {
        key: 'osVersion',
        type: 'text',
        title: 'نسخه OS',
        alt: 'نسخه فعلی سیستم‌عامل نصب‌شده',
        viewCol: false,
    },
    {
        key: 'managementIP',
        type: 'text',
        title: 'آدرس IP مدیریت',
        alt: 'IP مدیریتی برای دسترسی از راه دور یا لوکال',
        viewCol: true,
    },
    {
        key: 'lanWanIP',
        type: 'text',
        title: 'IP LAN / WAN',
        alt: 'IP شبکه داخلی و خارجی برای ارتباطات',
        viewCol: false,
    },
    {
        key: 'subnetGateway',
        type: 'text',
        title: 'Subnet Mask / Gateway',
        alt: 'جزئیات مربوط به Subnet و Gateway پیش‌فرض',
        viewCol: false,
    },
    {
        key: 'location',
        type: 'none',
        title: 'مکان فیزیکی',
        alt: 'محل نصب دستگاه (اتاق سرور، شعبه، رک ۲ و...)',
        viewCol: true,
    },
    {
        key: 'role',
        type: 'text',
        title: 'نقش / عملکرد',
        alt: 'عملکرد اصلی روتر (Core Router، Edge، Branch، VPN Gateway و...)',
        viewCol: false,
    },
    {
        key: 'vlans',
        type: 'tags',
        title: 'VLANها',
        alt: 'VLANهای پیکربندی‌شده روی روتر',
        viewCol: false,
    },
    {
        key: 'routingProtocols',
        type: 'text',
        title: 'پروتکل‌های فعال',
        alt: 'پروتکل‌های Routing فعال (مانند OSPF، BGP، RIP و...)',
        viewCol: false,
    },
    {
        key: 'natPat',
        type: 'select',
        title: 'NAT / PAT',
        alt: 'وضعیت NAT یا PAT در شبکه',
        viewCol: false,
        options: [
            { label: 'فعال (NAT)', value: 'Enabled' },
            { label: 'PAT Only', value: 'PAT Only' },
            { label: 'غیرفعال', value: 'Disabled' },
        ],
    },
    {
        key: 'vpnType',
        type: 'text',
        title: 'نوع VPN',
        alt: 'نوع VPNها (IPSec، L2TP، PPTP، OpenVPN و...)',
        viewCol: false,
    },
    {
        key: 'installationDate',
        type: 'none',
        title: 'تاریخ نصب',
        alt: 'تاریخ نصب یا راه‌اندازی اولیه روتر',
        viewCol: false,
    },
    {
        key: 'lastConfigUpdate',
        type: 'none',
        title: 'آخرین بروزرسانی پیکربندی',
        alt: 'زمان آخرین تغییر در تنظیمات',
        viewCol: false,
    },
    {
        key: 'supportResponsible',
        type: 'text',
        title: 'مسئول پشتیبانی',
        alt: 'نام شخص یا تیم مسئول پشتیبانی',
        viewCol: false,
    },
    {
        key: 'notes',
        type: 'text',
        title: 'توضیحات',
        alt: 'توضیحات اضافه مانند پورت‌های خاص، دسترسی ریموت یا هشدارها',
        viewCol: false,
    },
    {
        key: 'dhcpEnabled',
        type: 'check',
        title: 'DHCP',
        alt: 'آیا DHCP Server یا Relay فعال است؟',
        viewCol: true,
    },
    {
        key: 'vpnEnabled',
        type: 'check',
        title: 'VPN',
        alt: 'آیا سرویس VPN فعال است؟',
        viewCol: true,
    },
];

export const routerInterfaceSchemaFields: ITableViewField<IRouterInterfacePopulated>[]  = [
    {
        key: 'routerName',
        alt: 'نام دستگاه',
        type: 'none',
        title: 'روتر'
    },
    {
        key: 'interface',
        alt: '',
        type: 'text',
        title: 'اینترفیس'
    },
    {
        key: 'connectionType',
        alt: 'LAN, WAN, VLAN',
        type: 'select',
        title: 'نوع اتصال',
        options: [
            { value: 'LAN', label: 'LAN' },
            { value: 'VLAN', label: 'VLAN' },
            { value: 'WAN', label: 'WAN' },
            { value: 'LOOPBACK', label: 'Loopback' },
        ]
    },
    {
        key: 'ip',
        alt: 'XXX.XXX.XXX.XXX',
        type: 'text',
        title: 'آدرس IP'
    },
    {
        key: 'subnet',
        alt: '',
        type: 'text',
        title: 'ساب‌نت'
    },
    {
        key: 'desc',
        alt: '',
        type: 'text',
        title: 'توضیحات'
    },
];

export const routerBackupSchemaFields: ITableViewField<IRouterBackupPopulated>[]  = [
    {
        key: 'routerName',
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
