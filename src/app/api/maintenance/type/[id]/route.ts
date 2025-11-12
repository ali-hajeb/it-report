import MaintenanceReport from "@/src/lib/module/maintenanceReport";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/maintenance/type/[id]'>) {
    try {
        const { id } = await ctx.params;

        const maintenance = await MaintenanceReport.findById(id);
        return NextResponse.json({ code: 200, message: '', maintenance }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
