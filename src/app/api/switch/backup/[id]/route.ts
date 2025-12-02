import {SwitchBackup} from "@/src/lib/module/switch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/switch/backup/[id]'>) {
    try {
        const { id } = await ctx.params;

        const switchBackup = await SwitchBackup.findById(id).populate(['location', 'switch']);
        return NextResponse.json({ code: 200, message: '', switchBackup }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/switch/backup/[id]'>) {
    try {
        const { id } = await ctx.params;

        const switchBackup = await SwitchBackup.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', switchBackup }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
