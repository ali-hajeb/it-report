import Asset from "@/src/lib/module/asset";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/asset/[id]'>) {
    try {
        const { id } = await ctx.params;

        const asset = await Asset.findById(id).populate(['location']);
        return NextResponse.json({ code: 200, message: '', asset }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/asset/[id]'>) {
    try {
        const { id } = await ctx.params;

        const asset = await Asset.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', asset }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
