import Config from "@/src/lib/module/config";
import connectDB from '@/src/lib/database/dbConnect';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const config = await Config.findOne();
        // if (config.length < 1) {
        //     return NextResponse.json({ code: 404 }, { status: 404});
        // }
        return NextResponse.json({ code: 200, config }, { status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ code: 400, data: error }, { status: 400});
    }
}
