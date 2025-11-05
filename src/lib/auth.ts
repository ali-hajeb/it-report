import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

const JWT_SEC = process.env.JWT_SEC!;

export async function hashPassword(pw: string) {
    return bcrypt.hash(pw, 12);
}

export async function verifyPassword(pw: string, hash: string) {
    return bcrypt.compare(pw, hash);
}

export function signToken(id: string, role: string) {
    return jwt.sign({ id, role }, JWT_SEC, { expiresIn: "7d" });
}

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    })
    console.log('store', cookieStore)
}

export async function setResponseAuthCookie(res: NextResponse, token: string) {
    res.cookies.set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    })
    // console.log('store', res)
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth');
}

export async function clearResponseAuthCookie(res: NextResponse) {
    res.cookies.delete('auth')
}
