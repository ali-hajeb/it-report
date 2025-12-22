import type { INewRouterBackup, IRouterBackup } from "@/src/lib/module/router";
import {RouterBackup} from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';
import authMiddleware, { IAuthorizedRequst } from "@/src/middleware/auth";

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
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        const searchParams = req.nextUrl.searchParams;
        const { limit = '25', skip = '0', ...query } = Object.fromEntries(searchParams.entries());

        const searchQuery: Record<string, string> = {...query};
        if ((req as IAuthorizedRequst).user.role === 'ADMIN' && !searchQuery.location) {
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

