import Router from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/router/[id]'>) {
    try {
        const { id } = await ctx.params;

        const router = await Router.findById(id);
        return NextResponse.json({ code: 200, message: '', router }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/router/[id]'>) {
    try {
        const { id } = await ctx.params;

        const router = await Router.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', router }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
