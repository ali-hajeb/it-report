import type { IAntennaLink, INewAntennaLink } from "@/src/lib/module/antenna";
import { AntennaLink } from "@/src/lib/module/antenna";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewAntennaLink;

        const antennaLink = await AntennaLink.create(data);
        return NextResponse.json({ code: 200, message: '', antennaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());

        const antennaLinks = await AntennaLink.find(query);
        return NextResponse.json({ code: 200, message: '', antennaLinks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IAntennaLink;

        const antennaLink = await AntennaLink.findByIdAndUpdate(_id, updatedData, { new: true });
        return NextResponse.json({ code: 200, message: '', antennaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

