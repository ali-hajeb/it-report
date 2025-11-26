import {RouterBackup} from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/router/backup/[id]'>) {
    try {
        const { id } = await ctx.params;

        const routerBackup = await RouterBackup.findById(id).populate(['location', 'router']);
        return NextResponse.json({ code: 200, message: '', routerBackup }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/router/backup/[id]'>) {
    try {
        const { id } = await ctx.params;

        const routerBackup = await RouterBackup.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', routerBackup }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
