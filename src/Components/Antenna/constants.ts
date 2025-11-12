import { ITableViewField } from "@/src/Components/TableView/types";
import { IAntennaPopulated } from "@/src/lib/module/common/types";

export const filters = {
    name: 'براساس نام آنتن',
    model: 'براساس مدل',
    ip: 'براساس ip',
    support: 'براساس مسئول پشتیبانی',
    status: 'براساس وضعیت'
}

export const antennaSchemaFields: ITableViewField<IAntennaPopulated>[] = [
    {
        key: "name",
        type: 'text',
        title: "نام آنتن",
        alt: "نام اختصاصی یا کد داخلی آنتن",
    },
    {
        key: "status",
        type: 'select',
        options: [
            { value: 'Active', label: 'روشن' },
            { value: 'Off', label: 'خاموش' },
            { value: 'Reserved', label: 'رزرو' },
        ],
        title: "وضعیت فعلی",
        alt: "وضعیت فعلی: فعال، خاموش یا رزرو"
    },
    {
        key: "type",
        type: 'text',
        title: "نوع آنتن",
        alt: "نوع آنتن مانند Omni، Panel، Dish یا Sector"
    },
    {
        key: "model",
        type: 'text',
        title: "برند / مدل",
        alt: "برند و مدل دقیق تجهیز"
    },
    {
        key: "frequency",
        type: 'number',
        title: "فرکانس (GHz)",
        alt: "فرکانس کاری آنتن (2.4، 5، 60 و...)"
    },
    {
        key: "output",
        type: 'number',
        title: "توان خروجی (dBm)",
        alt: "قدرت خروجی برحسب dBm"
    },
    {
        key: "gain",
        type: 'number',
        title: "گین (dBi)",
        alt: "بهره آنتن در واحد dBi"
    },
    {
        key: "installedLocation",
        type: 'text',
        title: "مکان نصب",
        alt: "محل فیزیکی نصب آنتن (بام، برج، تیر برق و...)"
    },
    {
        key: "height",
        type: 'number',
        title: "ارتفاع نصب (m)",
        alt: "ارتفاع از سطح زمین یا سقف"
    },
    {
        key: "angle",
        type: 'text',
        title: "زاویه افقی / عمودی",
        alt: "زاویه تنظیم‌شده افقی و عمودی"
    },
    {
        key: "azimuth",
        type: 'number',
        title: "جهت آنتن (Azimuth)",
        alt: "زاویه جهت‌دهی نسبت به شمال جغرافیایی"
    },
    {
        key: "connectedLink",
        type: 'select',
        options: [],
        title: "لینک متصل",
        alt: "آنتن مقصد یا دستگاه متصل"
    },
    {
        key: "linkType",
        type: 'select',
        options: [
            { value: 'P2P', label: 'Point-to-Point (P2P)'},
            { value: 'P2MP', label: 'Point-to-Multipoint (P2MP)' },
        ],
        title: "نوع لینک",
        alt: "نوع ارتباط: نقطه به نقطه یا چند نقطه"
    },
    {
        key: "relatedEquipment",
        type: 'text',
        title: "تجهیزات مرتبط",
        alt: "تجهیزات متصل مانند روتر، رادیو یا سوئیچ"
    },
    {
        key: "ip",
        type: 'text',
        title: "IP دستگاه",
        alt: "IP مدیریتی دستگاه"
    },
    {
        key: "macAddress",
        type: 'text',
        title: "مک آدرس",
        alt: "آدرس MAC دستگاه"
    },
    {
        key: "connectionType",
        type: 'select',
        options: [
            { value: 'LAN', label: 'LAN' },
            { value: 'Wireless', label: 'Wireless' },
        ],
        title: "نوع اتصال",
        alt: "نوع اتصال شبکه (LAN یا Wireless)"
    },
    {
        key: "firmware",
        type: 'text',
        title: "سیستم‌عامل / فریم‌ور",
        alt: "نسخه سیستم‌عامل یا فریم‌ور دستگاه"
    },
    {
        key: "installationDate",
        type: 'none',
        title: "تاریخ نصب",
        alt: "تاریخ نصب یا راه‌اندازی اولیه"
    },
    {
        key: "support",
        type: 'text',
        title: "مسئول پشتیبانی",
        alt: "نام فرد یا تیم پشتیبان"
    },
    {
        key: "notes",
        type: 'text',
        title: "توضیحات",
        alt: "یادداشت‌ها یا موارد خاص درباره نصب یا عملکرد"
    }
];
