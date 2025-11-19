import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongoDB'
import { hashPassword, setResponseAuthCookie, signToken } from '@/src/lib/auth';
import User from '@/src/lib/module/user';

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { firstName, lastName, username, password, location } = body;

        const exists = await User.findOne({ username });
        if (exists) {
            return NextResponse.json({ code: 401, message: 'User Exists' }, { status: 401 });
        }

        const user = await User.create({
            firstName,
            lastName,
            username,
            password: await hashPassword(password),
            location
        });

        await user.populate(['location']);

        const token = signToken(user._id.toString(), user.role);
        const response = NextResponse.json({ code: 200, message: 'Authentication Successful', user }, { status: 200 });
        setResponseAuthCookie(response, token);
        return response;
    } catch (error) {
        return NextResponse.json({ code: 0, message: '', data: error }, { status: 400 });
    }
}
