import { AntennaLink } from "@/src/lib/module/antenna";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/antenna/link/[id]'>) {
    try {
        const { id } = await ctx.params;

        const antennaLink = await AntennaLink.findById(id);
        return NextResponse.json({ code: 200, message: '', antennaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/antenna/link/[id]'>) {
    try {
        const { id } = await ctx.params;

        const antennaLink = await AntennaLink.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', antennaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
