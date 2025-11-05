import type { INewUnit, IUnit } from "@/src/lib/module/unit";
import Unit from "@/src/lib/module/unit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, adminstrator } = body as INewUnit;

        const unit = await Unit.create({ name, adminstrator });
        return NextResponse.json({ code: 200, message: '', unit }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());

        const units = await Unit.find(query);
        return NextResponse.json({ code: 200, message: '', units }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IUnit;

        const unit = await Unit.findByIdAndUpdate(_id, updatedData, { new: true });
        return NextResponse.json({ code: 200, message: '', unit }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

