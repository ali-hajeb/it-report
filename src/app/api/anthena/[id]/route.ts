import Anthena from "@/src/lib/module/anthena";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/anthena/[id]'>) {
    try {
        const { id } = await ctx.params;

        const anthena = await Anthena.findById(id);
        return NextResponse.json({ code: 200, message: '', anthena }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/anthena/[id]'>) {
    try {
        const { id } = await ctx.params;

        const anthena = await Anthena.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', anthena }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
