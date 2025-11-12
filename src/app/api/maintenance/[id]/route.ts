import Antenna from "@/src/lib/module/antenna";
import MaintenanceReport, { IMaintenanceReport } from "@/src/lib/module/maintenanceReport/";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/maintenance/[id]'>) {
    try {
        const { id } = await ctx.params;

        const maintenance: IMaintenanceReport = await MaintenanceReport.findById(id);
        if (!maintenance) {
            return NextResponse.json({ code: 404, message: 'Record Not Found'}, { status: 404 });
        }

        let device = {};
        switch (maintenance.deviceType) {
            case 'antenna': {
                device = await Antenna.findById(maintenance.device).populate(['location', 'maintenance', 'connectedLink']);
                break;
            };
            case "router": {
                // device = await Antenna.findById(maintenance.device).populate(['location', 'maintenance', 'connectedLink']);
                break;
            };
            case "server": {
                // device = await Antenna.findById(maintenance.device).populate(['location', 'maintenance', 'connectedLink']);
                break;
            };
            case "switch": {
                // device = await Antenna.findById(maintenance.device).populate(['location', 'maintenance', 'connectedLink']);
                break;
            };
        }
        return NextResponse.json({ code: 200, message: '', maintenance: {...maintenance, device } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/maintenance/[id]'>) {
    try {
        const { id } = await ctx.params;

        const maintenance = await MaintenanceReport.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', maintenance }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
