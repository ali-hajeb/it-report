import Contract from "@/src/lib/module/contracts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/contract/[id]'>) {
    try {
        const { id } = await ctx.params;

        const contract = await Contract.findById(id);
        return NextResponse.json({ code: 200, message: '', contract }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/contract/[id]'>) {
    try {
        const { id } = await ctx.params;

        const contract = await Contract.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', contract }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
