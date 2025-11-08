import Antenna from "@/src/lib/module/antenna";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/antenna/[id]'>) {
    try {
        const { id } = await ctx.params;

        const antenna = await Antenna.findById(id);
        return NextResponse.json({ code: 200, message: '', antenna }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/antenna/[id]'>) {
    try {
        const { id } = await ctx.params;

        const antenna = await Antenna.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', antenna }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
