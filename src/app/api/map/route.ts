
import Antenna, { AntennaLink, IAntenna, IAntennaLink } from "@/src/lib/module/antenna";
import Router, { IRouter } from "@/src/lib/module/router";
import Server, { IServer } from "@/src/lib/module/server";
import Switch, { ISwitch } from "@/src/lib/module/switch";
import authMiddleware from "@/src/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        const servers: IServer[] = await Server.find();
        const routers: IRouter[] = await Router.find();
        const switches: ISwitch[] = await Switch.find();
        const antennas: IAntenna[] = await Antenna.find();
        const antennaLinks: IAntennaLink[] = await AntennaLink.find();

        const devices = {
            level1: antennas.map(a => ({
                id: a._id,
                name: a.name,
                type: 'tower',
                position: a.coordination.length === 2 ? a.coordination : null,
                status: a.status.toLowerCase(),
                ip: a.ip,
                snr: a.gain,
            })),
            level2: [
                ...routers.map(a => ({
                id: a._id,
                name: a.name,
                type: 'router',
                position: a.coordination.length === 2 ? a.coordination : null,
                status: 'up',
                ip: a.managementIP,
            })),
                ...switches.map(a => ({
                id: a._id,
                name: a.name,
                type: 'switch',
                position: a.coordination.length === 2 ? a.coordination : null,
                status: a.currentStatus.toLowerCase(),
                color: 'yellow',
                ip: a.managementIP,
            })),
                ...servers.map(a => ({
                id: a._id,
                name: a.name,
                type: 'server',
                position: a.coordination.length === 2 ? a.coordination : null,
                status: a.currentStatus.toLowerCase(),
                ip: a.externalIP,
            })),,
            ],
        };
        const links = {
            level1: antennaLinks.map(link => {
                const source = antennas.find(a => a._id.toString() === link.source.toString());
                const destination = antennas.find(a => a._id.toString() === link.destination.toString());
                // console.log(source, destination);
                return source && destination && {
                from: source.coordination.length === 2 ? source.coordination : null,
                to: destination.coordination.length === 2 ? destination.coordination : null,
                status: link.status.toLowerCase(),
                bandwidth: link.bandwidth,
                desc: link.notes,
                };
            }),
            level2: [
                ...servers.map(s => {
                    const source = antennas.find(a => a._id.toString() === s.connectedAntenna?.toString());
                    return source && {
                        from: source.coordination.length === 2 ? source.coordination : null,
                        to: s.coordination.length === 2 ? s.coordination : null,
                        status: s.currentStatus.toLowerCase(),
                        desc: s.notes,
                    };
                }),
                ...switches.map(s => {
                    const source = antennas.find(a => a._id.toString() === s.connectedAntenna?.toString());
                    return source && {
                        from: source.coordination.length === 2 ? source.coordination : null,
                        to: s.coordination.length === 2 ? s.coordination : null,
                        status: s.currentStatus.toLowerCase(),
                        desc: s.notes,
                    };
                }),
                ...routers.map(s => {
                    const source = antennas.find(a => a._id.toString() === s.connectedAntenna?.toString());
                    return source && {
                        from: source.coordination.length === 2 ? source.coordination : null,
                        to: s.coordination.length === 2 ? s.coordination : null,
                        status: "up",
                        desc: s.notes,
                    };
                }),
            ]
        }
        // console.log("devices, links", devices, links);
        return NextResponse.json({ code: 200, message: '', devices, links }, { status: 200 });
    } catch (error) {
    }
}
