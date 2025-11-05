import { AnthenaLink } from "@/src/lib/module/anthena";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/anthena/link/[id]'>) {
    try {
        const { id } = await ctx.params;

        const anthenaLink = await AnthenaLink.findById(id);
        return NextResponse.json({ code: 200, message: '', anthenaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/anthena/link/[id]'>) {
    try {
        const { id } = await ctx.params;

        const anthenaLink = await AnthenaLink.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', anthenaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
