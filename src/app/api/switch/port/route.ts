import type { INewSwitchPort, ISwitchPort } from "@/src/lib/module/switch";
import { SwitchPort } from "@/src/lib/module/switch";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';
import "@/src/lib/module/antenna";
import "@/src/lib/module/location";
import "@/src/lib/module/switch";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewSwitchPort;

        const switchPort = await SwitchPort.create(data);
        await switchPort.populate(['location', 'switch']);
        return NextResponse.json({ code: 200, message: '', switchPort }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const { limit = '25', skip = '0', ...query } = Object.fromEntries(searchParams.entries());

        console.log('quey', query, searchParams.entries());
        const conditions = Object.keys(query).map(queryKey => {
            if (queryKey === 'location') {
                return { [queryKey]: query[queryKey] }
            }
            const regex = new RegExp(escapeRegex(query[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('condition', conditions);


        const count = await SwitchPort.countDocuments({ $and: conditions });
        const switchPorts = await SwitchPort.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location', 'switch']);

        return NextResponse.json({ code: 200, message: '', switchPorts, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as ISwitchPort;

        const switchPort = await SwitchPort.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location', 'switch']);
        return NextResponse.json({ code: 200, message: '', switchPort }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

