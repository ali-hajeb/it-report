import {SwitchPort} from "@/src/lib/module/switch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/switch/port/[id]'>) {
    try {
        const { id } = await ctx.params;

        const switchPort = await SwitchPort.findById(id).populate(['location', 'switch']);
        return NextResponse.json({ code: 200, message: '', switchPort }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/switch/port/[id]'>) {
    try {
        const { id } = await ctx.params;

        const switchPort = await SwitchPort.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', switchPort }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
