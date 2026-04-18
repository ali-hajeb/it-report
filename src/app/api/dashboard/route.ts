import Antenna, { IAntenna } from "@/src/lib/module/antenna";
import Asset, { IAsset } from "@/src/lib/module/asset";
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

        if ((req as IAuthorizedRequst).user.role === 'MANAGER' || (req as IAuthorizedRequst).user.role === 'MANAGER_VIEW_ONLY') {
            const locations: ILocation[] = await Location.find();
            const assets: IAsset[] = await Asset.find();
            const servers: IServer[] = await Server.find();
            const routers: IRouter[] = await Router.find();
            const switches: ISwitch[] = await Switch.find();
            const antennas: IAntenna[] = await Antenna.find();

            const info = locations.map((location, i) => {
                return {
                    _id: location._id,
                    name: location.name,
                    servers: servers.filter(server => server.location?.toString() === location._id.toString()).length,
                    assets: assets.filter(assets => assets.location?.toString() === location._id.toString()).length,
                    routers: routers.filter(router => router.location?.toString() === location._id.toString()).length,
                    antennas: antennas.filter(antenna => antenna.location?.toString() === location._id.toString()).length,
                    switches: switches.filter(s => s.location?.toString() === location._id.toString()).length
                }
            });

            return NextResponse.json({ code: 200, message: '', info }, { status: 200 });
        } else if ((req as IAuthorizedRequst).user.role === 'ADMIN') {
            const user = await User.findById((req as IAuthorizedRequst).user.id).populate(['location']).select('-password');
            if (!user) {
                return NextResponse.json({ code: 400, message: 'User Not Found' }, { status: 400 });
            }

            const servers = await Server.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const assets = await Asset.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const routers = await Router.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const switches = await Switch.countDocuments({ location: (user as unknown as IUserPopulated).location._id });
            const antennas = await Antenna.countDocuments({ location: (user as unknown as IUserPopulated).location._id });

            const info = {
                _id: (user as unknown as IUserPopulated).location._id,
                name: (user as unknown as IUserPopulated).location.name,
                servers, routers, switches, antennas, assets
            }
            return NextResponse.json({ code: 200, message: '', info }, { status: 200 });
        }

    } catch (error) {
        console.error(error);
    }
}
