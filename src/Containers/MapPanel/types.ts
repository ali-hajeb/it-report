export type IDeviceColor = 'blue' | 'red' | 'yellow';
export interface IDevice {
    id: number | string;
    name: string;
    type: 'antenna' | 'tower' | 'server' | 'router' | 'switch';
    position: [number, number];
    color?: IDeviceColor;
    size?: [number, number];
    status?: 'up' | 'down' | 'warning';
    ip?: string;
    snr?: string;
}

export interface ILink {
    from: [number, number];
    to: [number, number];
    status: string;
    bandwidth?: string;
    desc?: string;
}
