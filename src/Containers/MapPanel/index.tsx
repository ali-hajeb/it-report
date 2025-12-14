'use client';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getIcon } from './utils';
import { getState } from './constants';
import { useEffect, useState } from 'react';
import axiosInstance from '@/src/config/axios';
import { IDevice, ILink } from './types';

// Fix Leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ZoomListener({ setZoom }: { setZoom: (zoom: number) => void }) {
  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}

export default function InfrastructureMap() {
    const [zoom, setZoom] = useState(12);
    const [devices, setDevices] = useState<Record<string, IDevice[]>>({});
    const [links, setLinks] = useState<Record<string, ILink[]>>({});
    useEffect(() => {
        axiosInstance.get('/map')
            .then(res => {
                if (res.data.devices) {
                    setDevices(res.data.devices);
                }
                if (res.data.links) {
                    setLinks(res.data.links);
                }
            })
            .catch(error => {
            })
            .finally(() => {
            });
    }, []);
    return (
        <div className="w-full h-150 relative">
            <MapContainer
                center={[30.599425975891904, 50.23982696097274]}
                zoom={zoom}
                className="h-full w-full"
                style={{ background: '#0f172a' }}
            >
                <ZoomListener setZoom={setZoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
                    attribution='&copy; OpenStreetMap'
                />
                {/* Devices */}
                {devices.level1?.map((device) => device && (
                    <Marker
                        key={device.id}
                        position={device.position as [number, number]}
                        icon={getIcon(device)}
                    >
                        {/* Permanent tooltip on hover */}
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                            <div className="bg-black/90 text-white px-3 py-2 rounded text-xs font-medium">
                                <div className="font-bold">{device.name}</div>
                                <div>IP: {device.ip}</div>
                                {device.snr && <div>SNR: {device.snr}</div>}
                                <div className="mt-1">
                                    Status: <span className={getState(device.status) === 'up' ? 'text-green-400' : getState(device.status) === 'down' ? 'text-red-400' : 'text-yellow-400'}>
                                        ● {device.status?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </Tooltip>

                        {/* Click popup */}
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{device.name}</h3>
                                <p>Type: {device.type}</p>
                                <p>IP: {device.ip}</p>
                                <p>Coordinates: {device.position[0]?.toFixed(4)}, {device.position[1]?.toFixed(4)}</p>
                                {/* <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"> */}
                                {/*     View Details */}
                                {/* </button> */}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {links.level1?.map((link, i) => link && (
                    <Polyline
                        key={i}
                        positions={[link.from as [number, number], link.to as [number, number]]}
                        color={link.status === 'up' ? '#10b981' : link.status === 'down' ? '#ef4444' : '#f59e0b'}
                        weight={link.status === 'up' ? 4 : 3}
                        opacity={link.status === 'down' ? 0.5 : 0.9}
                        dashArray={link.status === 'warning' ? '10, 10' : undefined}
                        className={link.status === 'up' ? 'animate-pulse' : ''}
                    >
                        { (link.bandwidth || link.desc) && 
                            <Tooltip direction="auto" permanent={false} opacity={0.8}>
                                <span dir='ltr' className="bg-black/80 text-white px-2 py-1 rounded text-xs">
                                    {link.bandwidth} Mb/s
                                </span>
                                <span dir='ltr' className="bg-black/80 text-white px-2 py-1 rounded text-xs">
                                    {link.desc}
                                </span>
                            </Tooltip>
                        }
                    </Polyline>
                ))}

                {
                    zoom >= 13 && <> 
                        { devices.level2?.map((device, i) => device &&
                            <Marker
                                key={device.id}
                                position={device.position as [number, number]}
                                icon={getIcon(device)}
                            >
                                {/* Permanent tooltip on hover */}
                                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                                    <div className="bg-black/90 text-white px-3 py-2 rounded text-xs font-medium">
                                        <div className="font-bold">{device.name}</div>
                                        <div>IP: {device.ip}</div>
                                        {device.snr && <div>SNR: {device.snr}</div>}
                                        <div className="mt-1">
                                            Status: <span className={getState(device.status) === 'up' ? 'text-green-400' : getState(device.status) === 'down' ? 'text-red-400' : 'text-yellow-400'}>
                                                ● {device.status?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </Tooltip>

                                {/* Click popup */}
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-lg">{device.name}</h3>
                                        <p>Type: {device.type}</p>
                                        <p>IP: {device.ip}</p>
                                        <p>Coordinates: {device.position[0]?.toFixed(4)}, {device.position[1]?.toFixed(4)}</p>
                                        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            View Details
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        ) }
                        { links.level2?.map((link, i) => link && (
                            <Polyline
                                key={i}
                                positions={[link.from as [number, number], link.to as [number, number]]}
                                color={link.status === 'up' || link.status === 'active' ? '#a9e34b' : link.status === 'down' || link.status === 'inactive' || link.status === 'offline' ? '#ef4444' : '#f59e0b'}
                                weight={link.status === 'up'|| link.status === 'active' ? 4 : 3}
                                opacity={link.status === 'down' || link.status === 'inactive' || link.status === 'offline' ? 0.5 : 0.9}
                                dashArray={link.status === 'warning' ? '10, 10' : undefined}
                                className={link.status === 'up' || link.status === 'active' ? 'animate-pulse' : ''}
                            >
                                { link.bandwidth && 
                                    <Tooltip direction="center" permanent opacity={0.8}>
                                        <span className="bg-black/80 text-white px-2 py-1 rounded text-xs">
                                            {link.bandwidth}
                                        </span>
                                    </Tooltip>
                                }
                            </Polyline>
                        ))}
                    </>
                }

            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg shadow-xl p-4 z-99 text-sm">
                <h3 className="font-bold mb-2">Legend</h3>
                <div className="space-y-1">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded-full"></div> Up</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-600 rounded-full"></div> Down</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded-full"></div> Warning</div>
                </div>
            </div>
        </div>
    );
}
