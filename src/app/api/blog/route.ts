import type { IBlog } from "@/src/lib/module/blog";
import Blog from "@/src/lib/module/blog";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';
import authMiddleware, { IAuthorizedRequst } from "@/src/middleware/auth";
import dbConnect from "@/src/lib/mongoDB";
import { INewBlogWithFile } from "@/src/lib/module/blog/actions";
import { unlink } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewBlogWithFile;

        console.log("file: ", data.file, data);
        if (data.newFile) {
            data.file = { ...data.newFile };
        }

        const blog = await Blog.create(data);
        await blog.populate(['location', 'author']);
        return NextResponse.json({ code: 200, message: '', blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        const searchParams = req.nextUrl.searchParams;
        const { limit = '0', skip = '0', sort = '{ "createdAt": -1 }', ...query } = Object.fromEntries(searchParams.entries());
        console.log('t1', sort);
        console.log('ttttt', JSON.parse(sort));

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


        const count = await Blog.countDocuments({ $and: conditions });
        console.log('counter: ', count);
        const blogs = await Blog.find({ $and: conditions })
            .sort({...(JSON.parse(sort))})
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location', 'author']);

        return NextResponse.json({ code: 200, message: '', blogs, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, newFile, ...updatedData } = body as IBlog;

        console.log(">>> file", updatedData.file);
        if (newFile) {
            try {
                const oldUrl = updatedData.file?.url;
                updatedData.file = {...newFile };
                if (oldUrl) {
                    const oldFilePath = path.join(process.cwd(), 'public', oldUrl);
                    console.log(oldFilePath);
                    await unlink(oldFilePath);
                }
            } catch (error) {
                console.error(error);
            }
        }
        const blog = await Blog.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location', 'author']);
        return NextResponse.json({ code: 200, message: '', blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

