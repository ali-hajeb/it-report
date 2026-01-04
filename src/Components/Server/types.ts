export interface ServerForm {
    name: string; // نام سرور
    serverType: string; // نوع سرور (Physical / Virtual / Cloud)
    brand: string; // برند (Dell, HP, Supermicro, etc.)
    model: string; // مدل
    serialNumber: string; // سریال نامبر (SN)
    internalIP?: string; // IP داخلی
    externalIP?: string; // IP خارجی
    os: string; // سیستم‌عامل (Windows Server, Ubuntu, CentOS, etc.)
    osVersion?: string; // نسخه سیستم‌عامل / Build
    role: string; // نقش سرور (Database, Web, Application, File Server, etc.)
    activeServices?: string[]; // سرویس‌های فعال (مثلاً: IIS, Apache, SQL Server, Docker)
    cpuCores: string; // تعداد هسته CPU
    ramGB: string; // حجم RAM (GB)
    hddCapacityGB?: string; // ظرفیت HDD/SSD مجموع (GB)
    raid?: string; // RAID (RAID0, RAID1, RAID5, RAID10, etc.)
    gpu?: string; // GPU (اختیاری)
    networkInterfaces?: string; // NIC ها / سرعت شبکه (مثلاً: 2x 10GbE + 4x 1GbE)
    location: string;
    perciseLocation: string; // محل استقرار (دیتاسنتر تهران، دفتر مرکزی، etc.)
    rackName?: string; // نام رک (Rack-01, A12, etc.)
    hostname: string; // Hostname
    domainOrWorkgroup?: string; // دامین / Workgroup
    backupStatus: 'Active' | 'Inactive' | null; // وضعیت بکاپ
    importantSoftware?: string[]; // نرم‌افزارهای مهم
    currentStatus: 'Active' | 'Down' | 'Reserved' | null; // وضعیت فعلی
    supportResponsible?: string; // مسئول پشتیبانی (نام یا ایمیل)
    remoteAccess?: string; // دسترسی ریموت (RDP, SSH, iLO, iDRAC, IPMI, etc.)
    openPorts?: string[]; // پورت‌های باز (مثلاً: [3389, 22, 443])
    notes?: string; // توضیحات
    coordination: string;
    connectedAntenna: string | null;
}

export interface ServerCheckListForm {
    date: string;
    // server: string;
    // serverName: string;
    location: string;
}
