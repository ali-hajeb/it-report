import {RouterInterface} from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/router/interface/[id]'>) {
    try {
        const { id } = await ctx.params;

        const routerInterface = await RouterInterface.findById(id).populate(['location', 'router']);
        return NextResponse.json({ code: 200, message: '', routerInterface }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/router/interface/[id]'>) {
    try {
        const { id } = await ctx.params;

        const routerInterface = await RouterInterface.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', routerInterface }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
