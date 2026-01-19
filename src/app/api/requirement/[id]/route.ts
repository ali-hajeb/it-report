import Requirement from "@/src/lib/module/requirement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/requirement/[id]'>) {
    try {
        const { id } = await ctx.params;

        const requirement = await Requirement.findById(id).populate(['location']);
        return NextResponse.json({ code: 200, message: '', requirement }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/requirement/[id]'>) {
    try {
        const { id } = await ctx.params;

        const requirement = await Requirement.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', requirement }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
