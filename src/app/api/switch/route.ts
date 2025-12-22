import type { INewSwitch, ISwitch } from "@/src/lib/module/switch";
import Switch from "@/src/lib/module/switch";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';
import authMiddleware, { IAuthorizedRequst } from "@/src/middleware/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewSwitch;

        const _switch = await Switch.create(data);
        await _switch.populate(['location', 'connectedAntenna']);
        return NextResponse.json({ code: 200, message: '', _switch }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        const searchParams = req.nextUrl.searchParams;
        const { limit = '25', skip = '0', ...query } = Object.fromEntries(searchParams.entries());

        const searchQuery: Record<string, string> = {...query};
        if ((req as IAuthorizedRequst).user.role === 'ADMIN') {
            searchQuery.location = (req as IAuthorizedRequst).user.location;
        }

        console.log('-----------quey', query, searchParams.entries());
        const conditions = Object.keys(query).map(queryKey => {
            if (queryKey === 'location') {
                return { [queryKey]: query[queryKey] }
            }
            const regex = new RegExp(escapeRegex(query[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('---------condition', conditions);


        const count = await Switch.countDocuments({ $and: conditions });
        console.log('---------count', count);
        const _switches = await Switch.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location', 'connectedAntenna']);

        return NextResponse.json({ code: 200, message: '', _switches, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as ISwitch;

        const _switch = await Switch.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location', 'connectedAntenna']);
        return NextResponse.json({ code: 200, message: '', _switch }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

