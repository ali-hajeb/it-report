import type { INewAnthena, IAnthena } from "@/src/lib/module/anthena";
import Anthena from "@/src/lib/module/anthena";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewAnthena;

        const anthena = await Anthena.create(data);
        return NextResponse.json({ code: 200, message: '', anthena }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());

        const anthenas = await Anthena.find(query);
        return NextResponse.json({ code: 200, message: '', anthenas }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IAnthena;

        const anthena = await Anthena.findByIdAndUpdate(_id, updatedData, { new: true });
        return NextResponse.json({ code: 200, message: '', anthena }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

