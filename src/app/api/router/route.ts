import type { INewRouter, IRouter } from "@/src/lib/module/router";
import Router from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewRouter;

        const router = await Router.create(data);
        await router.populate(['location']);
        return NextResponse.json({ code: 200, message: '', router }, { status: 200 });
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


        const count = await Router.countDocuments({ $and: conditions });
        const routers = await Router.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location']);

        return NextResponse.json({ code: 200, message: '', routers, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IRouter;

        const router = await Router.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location']);
        return NextResponse.json({ code: 200, message: '', router }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

