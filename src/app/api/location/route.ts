import type { INewLocation, ILocation } from "@/src/lib/module/location";
import Location from "@/src/lib/module/location";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, city, address } = body as INewLocation;

        const location = await Location.create({ name, city, address });
        return NextResponse.json({ code: 200, message: '', location }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());

        const locations = await Location.find(query);
        return NextResponse.json({ code: 200, message: '', location: locations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as ILocation;

        const location = await Location.findByIdAndUpdate(_id, updatedData, { new: true });
        return NextResponse.json({ code: 200, message: '', location }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

