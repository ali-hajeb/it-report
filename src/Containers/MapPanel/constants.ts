import { IDevice, ILink } from "./types";

export const DEVICES: IDevice[] = [
    {
        id: 1,
        name: 'دکل ستاد بهبهان',
        type: 'tower',
        position: [30.589969196348754, 50.23461291409473],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 2,
        name: 'دکل شهرک وحدت',
        type: 'tower',
        position: [30.59845109667183, 50.317967791751904],
        status: 'up',
        ip: '10.10.11.1',
    },
    {
        id: 3,
        name: 'دکل خوابگاه',
        type: 'tower',
        position: [30.589898049496338, 50.267719010034],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 4,
        name: 'دکل دودانگه',
        type: 'tower',
        position: [30.712692124626916, 50.187993031274644],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 5,
        name: 'دکل تشان',
        type: 'tower',
        position: [30.828073634739766, 50.19950739086489],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 6,
        name: 'دکل آب‌امیری',
        type: 'tower',
        position: [30.736489553283878, 50.05972889997122],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 7,
        name: 'دکل کردستان',
        type: 'tower',
        position: [30.67048381818075, 50.18976273955119],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 8,
        name: 'دکل ستاد زیدون',
        type: 'tower',
        position: [30.329420234231407, 50.219941340849765],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 9,
        name: 'دکل درونک',
        type: 'tower',
        position: [30.357113539418567, 50.05504483684131],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    {
        id: 10,
        name: 'دکل لنگیر',
        type: 'tower',
        position: [30.45765934849225, 50.00224011858579],
        status: 'up',
        size: [40, 40],
        ip: '10.10.11.1',
    },
    // { id: 1, name: "Main Tower - Pasdaran", type: "antenna", position: [35.7585, 51.4501], status: "up" as const, ip: "10.10.1.1", snr: "-54 dBm" },
    // { id: 2, name: "Farmanieh POP", type: "antenna", position: [35.7992, 51.4658], status: "up" as const, ip: "10.10.2.1" },
    // { id: 3, name: "Vanak Router", type: "router", position: [35.7600, 51.4080], status: "up" as const },
    // { id: 4, name: "Tajrish AP", type: "antenna", position: [35.8040, 51.4320], status: "warning" as const },
    // { id: 5, name: "Data Center", type: "server", position: [35.6960, 51.3810], status: "up" as const },
];

export const DEVICES_DETAILED: IDevice[] = [
    {
        id: 1,
        name: 'خوابگاه پسران',
        type: 'switch',
        position: [30.593276872681898, 50.27142735347553],
        status: 'up',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 2,
        name: 'خوابگاه دختران',
        type: 'switch',
        position: [30.591785250179342, 50.273511119612685],
        status: 'up',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 3,
        name: 'خوابگاه دختران',
        type: 'switch',
        position: [30.59014255073343, 50.270791256444184],
        status: 'up',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 4,
        name: 'دانشکده پرستاری',
        type: 'switch',
        position: [30.586177299356127, 50.258815084862675],
        status: 'up',
        color: 'yellow',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 5,
        name: 'دانشکده پیراپزشکی',
        type: 'switch',
        position: [30.584252059407493, 50.238102676931256],
        status: 'up',
        color: 'yellow',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 6,
        name: 'مرکز بهورزی',
        type: 'switch',
        position: [30.58315050678502, 50.229762715646245],
        status: 'up',
        color: 'yellow',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 7,
        name: 'پایگاه ضمیمه پاکساز',
        type: 'switch',
        position: [30.587497632652838, 50.216258833010826],
        status: 'up',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 8,
        name: 'بیمارستان شهیدزاده',
        type: 'switch',
        position: [30.592454298477005, 50.2302196998181],
        status: 'up',
        color: 'red',
        size: [24, 24],
        ip: '10.10.11.1',
    },
    {
        id: 9,
        name: 'پایگاه ضمیمه شهیدان متولی',
        type: 'switch',
        position: [30.592336285634094, 50.238011280234765],
        status: 'up',
        size: [24, 24],
        ip: '10.10.11.1',
    },
];

export const LINKS_DETAILED: ILink[] = [
    { from: DEVICES[2].position, to: DEVICES_DETAILED[0].position, status: "up" },
    { from: DEVICES[2].position, to: DEVICES_DETAILED[1].position, status: "up" },
    { from: DEVICES[2].position, to: DEVICES_DETAILED[2].position, status: "up" },
    { from: DEVICES[2].position, to: DEVICES_DETAILED[3].position, status: "up" },
];

// Wireless links (red = down, green = up, dashed = backup)
export const LINKS: ILink[] = [
    { from: DEVICES[0].position, to: DEVICES[1].position, status: "up" },
    { from: DEVICES[0].position, to: DEVICES[2].position, status: "up" },
    { from: DEVICES[0].position, to: DEVICES[3].position, status: "up" },
    { from: DEVICES[3].position, to: DEVICES[4].position, status: "up" },
    { from: DEVICES[3].position, to: DEVICES[5].position, status: "up" },
    { from: DEVICES[3].position, to: DEVICES[6].position, status: "up" },
    { from: DEVICES[7].position, to: DEVICES[8].position, status: "up" },
    { from: DEVICES[7].position, to: DEVICES[9].position, status: "up" },
];

const ACTIVE_STATE = ['up', 'active', 'online'];
const INACTIVE_STATE = ['down', 'inactive', 'offline'];

export const getState = (status?: string) => {
    if (!status) return null;
    if (ACTIVE_STATE.includes(status)) return 'up';
    else if (INACTIVE_STATE.includes(status)) return 'down';
    else return 'unknown';
}
