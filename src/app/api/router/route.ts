import type { INewRouter, IRouter } from "@/src/lib/module/router";
import Router from "@/src/lib/module/router";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';
import authMiddleware, { IAuthorizedRequst } from "@/src/middleware/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewRouter;

        const router = await Router.create(data);
        await router.populate(['location', 'connectedAntenna']);
        return NextResponse.json({ code: 200, message: '', router }, { status: 200 });
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


        const count = await Router.countDocuments({ $and: conditions });
        const routers = await Router.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location', 'connectedAntenna']);

        return NextResponse.json({ code: 200, message: '', routers, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IRouter;

        const router = await Router.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location', 'connectedAntenna']);
        return NextResponse.json({ code: 200, message: '', router }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

