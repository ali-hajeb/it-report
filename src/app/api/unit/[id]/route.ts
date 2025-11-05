import Unit from "@/src/lib/module/unit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/unit/[id]'>) {
    try {
        const { id } = await ctx.params;

        const unit = await Unit.findById(id);
        return NextResponse.json({ code: 200, message: '', unit }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/unit/[id]'>) {
    try {
        const { id } = await ctx.params;

        const unit = await Unit.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', unit }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
