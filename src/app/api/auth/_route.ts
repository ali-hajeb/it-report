import User from "@/app/lib/module/user";
import { NextRequest, NextResponse } from "next/server";
import type { IUserSchema } from '@/app/lib/module/user/';
import dbConnect from "@/app/lib/database/dbConnect";


export async function PUT(request: NextRequest) {
    // Parse the request body
    const body = await request.json();
    const userData = body as IUserSchema;

    try {
        await dbConnect();
        const user = await User.create({ ...userData });
        const populated = await user.populate(['location']);
        return NextResponse.json({ user: populated }, {status: 201});
    } catch (error) {
        return NextResponse.json({ error }, {status: 401});
    }

}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    try {
        await dbConnect();
        const { one, ...filter } = Object.fromEntries(searchParams.entries());
        if (one) {
            const user = await User.findOne({...filter}).populate(['location']);
            return NextResponse.json({ user }, { status: 201 });
        } else {
            const users = await User.find({...filter}).populate(['location']);
            return NextResponse.json({ users }, { status: 201 });
        }

    } catch (error) {
        return NextResponse.json({ error }, {status: 401});
    }
}

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;
    if (!username || !password) {
        return NextResponse.json({ message: 'Enter username and password!' }, {status: 401});
    }

    try {
        await dbConnect();
        const user = await User.findOne({ username });
        if (user && user.authenticateUser(password)) {
            return NextResponse.json({ user }, {status: 201});
        } else {
            throw Error("Unable to authenticate");
        }
    } catch (error) {
        return NextResponse.json({ error }, {status: 401});
    }
}

export async function PATCH(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { code, programCode, title, type, cols, _id } = body;

    try {
        await dbConnect();
        const user = await User.findByIdAndUpdate(_id, { code, programCode, title, type, cols }, {new: true}).populate(['cols', 'type']);
        return NextResponse.json({ user }, {status: 201});
    } catch (error) {
        return NextResponse.json({ error }, {status: 401});
    }

}

export async function DELETE(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { _id } = body;

    try {
        await dbConnect();
        console.log(_id);
        const deleted = await User.findByIdAndDelete(_id);
        return NextResponse.json({ user: deleted }, {status: 201});
    } catch (error) {
        return NextResponse.json({ error }, {status: 401});
    }

}
