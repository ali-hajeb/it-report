import Server from "@/src/lib/module/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/server/[id]'>) {
    try {
        const { id } = await ctx.params;

        const server = await Server.findById(id);
        return NextResponse.json({ code: 200, message: '', server }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/server/[id]'>) {
    try {
        const { id } = await ctx.params;

        const server = await Server.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', server }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
