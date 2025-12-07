import { ITableViewField } from "@/src/Components/TableView/types";
import { IAntennaLinkPopulated, IAntennaPopulated } from "@/src/lib/module/common/types";

export const filters = {
    name: 'براساس نام آنتن',
    model: 'براساس مدل',
    ip: 'براساس ip',
    support: 'براساس مسئول پشتیبانی',
    status: 'براساس وضعیت'
}

export const antennaLinkFilters = {
    name: 'براساس نام لینک',
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
        alt: "فرکانس کاری آنتن (2.4، 5، 60 و...)",
        viewCol: false,
    },
    {
        key: "output",
        type: 'number',
        title: "توان خروجی (dBm)",
        alt: "قدرت خروجی برحسب dBm",
        viewCol: false,
    },
    {
        viewCol: false,
        key: "gain",
        type: 'number',
        title: "گین (dBi)",
        alt: "بهره آنتن در واحد dBi"
    },
    {
        viewCol: false,
        key: "installedLocation",
        type: 'text',
        title: "مکان نصب",
        alt: "محل فیزیکی نصب آنتن (بام، برج، تیر برق و...)"
    },
    {
        viewCol: false,
        key: "height",
        type: 'number',
        title: "ارتفاع نصب (m)",
        alt: "ارتفاع از سطح زمین یا سقف"
    },
    {
        viewCol: false,
        key: "angle",
        type: 'text',
        title: "زاویه افقی / عمودی",
        alt: "زاویه تنظیم‌شده افقی و عمودی"
    },
    {
        viewCol: false,
        key: "azimuth",
        type: 'number',
        title: "جهت آنتن (Azimuth)",
        alt: "زاویه جهت‌دهی نسبت به شمال جغرافیایی"
    },
    // {
    //     key: "connectedLink",
    //     type: 'select',
    //     options: [],
    //     title: "لینک متصل",
    //     alt: "آنتن مقصد یا دستگاه متصل"
    // },
    {
        viewCol: false,
        key: "linkType",
        type: 'select',
        options: [
            { value: 'P2P', label: 'Point-to-Point (P2P)'},
            { value: 'P2MP', label: 'Point-to-Multipoint (P2MP)' },
        ],
        title: "نوع لینک",
        alt: "نوع ارتباط: نقطه به نقطه یا چند نقطه"
    },
    // {
    //     key: "connectedDevices",
    //     type: 'checkGroup',
    //     title: "تجهیزات مرتبط",
    //     alt: "تجهیزات متصل مانند روتر، رادیو یا سوئیچ",
    //     viewCol: false,
    // },
    {
        key: "coordination",
        type: 'text',
        title: "مختصات مکانی",
        alt: "مختصات دقیق مکان روی نقشه",
        viewCol: false,
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
        viewCol: false,
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
        viewCol: false,
        key: "notes",
        type: 'text',
        title: "توضیحات",
        alt: "یادداشت‌ها یا موارد خاص درباره نصب یا عملکرد"
    }
];

export const antennaLinkSchemaFields: ITableViewField<IAntennaLinkPopulated>[] = [
    {
        key: 'name',
        type: 'text',
        title: 'نام لینک',
        alt: 'نام اختصاصی لینک'
    },
    {
        key: 'source',
        type: 'none',
        title: 'آنتن مبدأ',
        alt: ''
    },
    {
        key: 'destination',
        type: 'none',
        title: 'آنتن مقصد',
        alt: ''
    },
    {
        key: 'distance',
        type: 'text',
        title: 'فاصله (km)',
        alt: 'فاصله میان دو آنتن',
        viewCol: false,
    },
    {
        key: 'signalIntensity',
        type: 'text',
        title: 'قدرت سیگنال (dBm)',
        alt: 'میزان قدرت سیگنال',
        viewCol: false,

    },
    {
        key: 'linkQuality',
        type: 'text',
        title: 'کیفیت لینک (%)',
        alt: 'میزان کیفیت لینک',
        viewCol: false,

    },
    {
        key: 'linkType',
        type: 'text',
        title: 'نوع لینک (GHz)',
        alt: '2.4, 5, 60',
        viewCol: false,

    },
    {
        key: 'bandwidth',
        type: 'text',
        title: 'پهنای باند (Mbps)',
        alt: 'میزان پهنای باند'
    },
    {
        key: 'encryption',
        type: 'text',
        title: 'نوع رمزگذاری',
        alt: 'WEP, WPA, ...'
    },
    {
        key: 'status',
        type: 'select',
        title: 'وضعیت فعلی',
        alt: 'Up, Down',
        options: [
            { value: 'Up', label: 'فعال' },
            { value: 'Down', label: 'غیرفغال' },
        ],
    },
    {
        key: 'notes',
        type: 'text',
        title: 'توضیحات',
        alt: ''
    },
];
