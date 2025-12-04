import Antenna, { IAntenna } from "@/src/lib/module/antenna";
import Location, { ILocation } from "@/src/lib/module/location";
import Router, { IRouter } from "@/src/lib/module/router";
import Server, { IServer } from "@/src/lib/module/server";
import Switch, { ISwitch } from "@/src/lib/module/switch";
import User, { IUserPopulated } from "@/src/lib/module/user";
import authMiddleware, { IAuthorizedRequst } from "@/src/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        if ((req as IAuthorizedRequst).user.role === 'MANAGER') {
            const locations: ILocation[] = await Location.find();
            const servers: IServer[] = await Server.find();
            const routers: IRouter[] = await Router.find();
            const switches: ISwitch[] = await Switch.find();
            const antennas: IAntenna[] = await Antenna.find();

            console.log(locations, servers);

            const info = locations.map((location, i) => {
                return {
                    _id: location._id,
                    name: location.name,
                    servers: servers.filter(server => server.location.toString() === location._id.toString()).length,
                    routers: routers.filter(router => router.location.toString() === location._id.toString()).length,
                    antennas: antennas.filter(antenna => antenna.location.toString() === location._id.toString()).length,
                    switches: switches.filter(s => s.location.toString() === location._id.toString()).length
                }
            });

            return NextResponse.json({ code: 200, message: '', info }, { status: 200 });
        } else if ((req as IAuthorizedRequst).user.role === 'ADMIN') {
            const user = await User.findById((req as IAuthorizedRequst).user.id).populate(['location']).select('-password');
            if (!user) {
                return NextResponse.json({ code: 400, message: 'User Not Found' }, { status: 400 });
            }

            const servers = await Server.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const routers = await Router.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const switches = await Switch.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const antennas = await Antenna.countDocuments({ location: (user as unknown as IUserPopulated).location._id });

            const info = {
                _id: (user as unknown as IUserPopulated).location._id,
                name: (user as unknown as IUserPopulated).location.name,
                servers, routers, switches, antennas
            }
            return NextResponse.json({ code: 200, message: '', info }, { status: 200 });
        }

    } catch (error) {
    }
}
