import type { INewAnthenaLink, IAnthenaLink } from "@/src/lib/module/anthena";
import { AnthenaLink } from "@/src/lib/module/anthena";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewAnthenaLink;

        const anthenaLink = await AnthenaLink.create(data);
        return NextResponse.json({ code: 200, message: '', anthenaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());

        const anthenaLinks = await AnthenaLink.find(query);
        return NextResponse.json({ code: 200, message: '', anthenaLinks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IAnthenaLink;

        const anthenaLink = await AnthenaLink.findByIdAndUpdate(_id, updatedData, { new: true });
        return NextResponse.json({ code: 200, message: '', anthenaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

