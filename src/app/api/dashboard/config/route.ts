import Config from "@/src/lib/module/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const config = await Config.findOne();
        return NextResponse.json({ code: 200, config }, { status: 200});
    } catch (error) {
    }
}
