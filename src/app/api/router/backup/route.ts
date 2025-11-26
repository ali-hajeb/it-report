import type { INewRouterBackup, IRouterBackup } from "@/src/lib/module/router";
import {RouterBackup} from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewRouterBackup;

        const routerBackup = await RouterBackup.create(data);
        await routerBackup.populate(['location', 'router']);
        return NextResponse.json({ code: 200, message: '', routerBackup }, { status: 200 });
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


        const count = await RouterBackup.countDocuments({ $and: conditions });
        const routerBackups = await RouterBackup.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location', 'router']);

        return NextResponse.json({ code: 200, message: '', routerBackups, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IRouterBackup;

        const routerBackup = await RouterBackup.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location', 'router']);
        return NextResponse.json({ code: 200, message: '', routerBackup }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

