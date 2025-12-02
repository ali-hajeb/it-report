import Switch from "@/src/lib/module/switch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/switch/[id]'>) {
    try {
        const { id } = await ctx.params;

        const _switch = await Switch.findById(id).populate(['location', 'connectedAntenna']);
        return NextResponse.json({ code: 200, message: '', _switch }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/switch/[id]'>) {
    try {
        const { id } = await ctx.params;

        const _switch = await Switch.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', _switch }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
