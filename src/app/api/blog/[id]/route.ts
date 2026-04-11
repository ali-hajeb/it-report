import Blog from "@/src/lib/module/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/blog/[id]'>) {
    try {
        const { id } = await ctx.params;

        const blog = await Blog.findById(id).populate(['location', 'author']);
        return NextResponse.json({ code: 200, message: '', blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/blog/[id]'>) {
    try {
        const { id } = await ctx.params;

        const blog = await Blog.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
