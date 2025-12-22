import type { IAntennaLink, INewAntennaLink } from "@/src/lib/module/antenna";
import { AntennaLink } from "@/src/lib/module/antenna";
import authMiddleware, { IAuthorizedRequst } from "@/src/middleware/auth";
import { escapeRegex } from "@/src/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewAntennaLink;

        const antennaLink = await AntennaLink.create(data);
        await antennaLink.populate(['location', 'source', 'destination']);
        return NextResponse.json({ code: 200, message: '', antennaLink }, { status: 200 });
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

        console.log('quey', query, searchParams.entries());
        const conditions = Object.keys(searchQuery).map(queryKey => {
            if (queryKey === 'location') {
                return { [queryKey]: searchQuery[queryKey] }
            }
            const regex = new RegExp(escapeRegex(searchQuery[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('condition', conditions);


        const count = await AntennaLink.countDocuments({ $and: conditions });
        console.log('check 1');
        const antennaLinks = await AntennaLink.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location', 'source', 'destination']);
        console.log('check 2', { code: 200, message: '', antennaLinks, count }, { status: 200 });

        return NextResponse.json({ code: 200, message: '', antennaLinks, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IAntennaLink;

        const antennaLink = await AntennaLink.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location', 'source', 'destination']);
        return NextResponse.json({ code: 200, message: '', antennaLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

