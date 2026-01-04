import { DivIcon } from "leaflet";
import { IDevice, IDeviceColor } from "./types";
import { getState } from "./constants";
import { BASE_PATH } from "@/src/Constants";

// Custom Icons
export const createAntennaIcon = (status: 'up' | 'down' | 'warning') => {
    return new DivIcon({
        html: `
            <div class="relative">
                <img src="${BASE_PATH}/icons/antenna.svg" class="w-10 h-10 drop-shadow-lg" />
                <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white 
                    ${getState(status) === 'up' ? 'bg-green-500' : getState(status) === 'down' ? 'bg-red-600' : 'bg-yellow-500'}
                    animate-pulse">
                </div>
            </div>
        `,
        className: 'custom-div-icon',
        iconSize: [48, 48],
        iconAnchor: [20, 40],
    });
};

export const createTowerIcon = (size: [number, number], status?: 'up' | 'active' | 'down' | 'inactive' | 'offline' | 'warning') => {
    console.log(size);
    return new DivIcon({
        html: `
            <div class="relative">
                <img src="${BASE_PATH}/icons/tower.svg" class="w-10 h-10 drop-shadow-lg" />
                <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white 
                    ${getState(status) === 'up' ? 'bg-green-500' : getState(status) === 'down' ? 'bg-red-600' : 'bg-yellow-500'}
                    animate-pulse">
                </div>
            </div>
        `,
        className: 'transparent-bg-icon',
        iconSize: size,
        iconAnchor: [size[0] / 2, size[1]],
    })
};

export const routerIcon = new DivIcon({
    html: `<img src="${BASE_PATH}/icons/router.svg" class="w-12 h-12" />`,
    className: 'transparent-bg-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

export const serverIcon = new DivIcon({
    html: `<img src="${BASE_PATH}/icons/server.svg" class="w-12 h-12" />`,
    className: 'transparent-bg-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 40],
});

export const createSwitchIcon = (color?: IDeviceColor) => new DivIcon({
    html: `<img src="${BASE_PATH}/icons/switch-solid${color ? '-' + color : ''}.svg" class="w-12 h-12" />`,
    className: 'transparent-bg-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 40],
});

export const getIcon = (device: IDevice) => {
    switch (device.type) {
        case "antenna" :
            return createAntennaIcon(device.status || 'down');
        case 'tower':
            return createTowerIcon(device.size || [40, 40], device.status || 'warning');
        case 'server':
            return serverIcon;
        case 'router':
            return routerIcon;
        case 'switch':
            return createSwitchIcon(device.color);
        default:
            return serverIcon;
    }
}
