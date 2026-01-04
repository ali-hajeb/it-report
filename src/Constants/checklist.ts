import { ICheckListItem } from "@/src/lib/module/server";

export const CHECKLIST: ICheckListItem[] = [
    {
        id: 'netLight',
        title: 'بررسی چراغ‌های وضعیت سرورها',
        status: -1,
        desc: '',
    },
    {
        id: 'netStorage',
        title: 'بررسی سلامت هاردها و ذخیره‌سازها',
        status: -1,
        desc: '',
    },
    {
        id: 'netLogs',
        title: 'بررسی لاگ‌های سیستم برای خطاها یا هشدارها',
        status: -1,
        desc: '',
    },
    {
        id: 'netSwitch',
        title: 'بررسی اتصالات سوئیچ‌ها',
        status: -1,
        desc: '',
    },
    {
        id: 'netConnectivity',
        title: 'بررسی اتصال شبکه داخلی و اینترنت',
        status: -1,
        desc: '',
    },

    {
        id: 'tempRoom',
        title: 'بررسی دمای اتاق (18 - 28)',
        status: -1,
        desc: '',
    },
    {
        id: 'tempHumidity',
        title: 'یررسی رطوبت نسبی اتاق (40 - 60)',
        status: -1,
        desc: '',
    },
    {
        id: 'tempSensor',
        title: 'بررسی هشدارهای سنسورهای اتاق',
        status: -1,
        desc: '',
    },

    {
        id: 'upsStatus',
        title: 'بررسی وضعیت UPS و اطمینان از عملکرد درست آن',
        status: -1,
        desc: '',
    },
    {
        id: 'upsBattery',
        title: 'ارزیابی سطح باتری‌های UPS و زمان باقی‌مانده',
        status: -1,
        desc: '',
    },
    {
        id: 'upsGenerator',
        title: 'کنترل وضعیت ژنراتورهای پشتیبانی (در صورت وجود)',
        status: -1,
        desc: '',
    },
    {
        id: 'upsVoltage',
        title: 'بررسی و کنترل ولتاژ و جریان ورودی اتاق سرور',
        status: -1,
        desc: '',
    },
    {
        id: 'secLock',
        title: 'بررسی وضعیت قفل‌ها و دسترسی‌ها',
        status: -1,
        desc: '',
    },
    {
        id: 'secEnt',
        title: 'کنترل ورود و خروج افراد',
        status: -1,
        desc: '',
    },
    {
        id: 'secCam',
        title: 'بررسی عملکرد دوربین‌های مداربسته',
        status: -1,
        desc: '',
    },
    {
        id: 'secFire',
        title: 'اطمینان از فعال بودن سیستم اعلام و اطفای حریق',
        status: -1,
        desc: '',
    },
];
