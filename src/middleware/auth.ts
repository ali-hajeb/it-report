import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { UserRole } from '@/src/lib/module/user/user.types';
import type IJwtPayload from '@/src/common/type/jwt.types';

const JWT_SEC = process.env.JWT_SEC!;

export interface IAuthorizedRequst extends NextRequest {
    user: {
        id: string;
        role: UserRole;
        location: string;
    }
}

export default function authMiddleware(
    req: NextRequest,
    requiredRole?: UserRole
) {
    try {
        const token = req.cookies.get('auth')?.value;
        if (!token) {
            return NextResponse.json({code: 401, message: 'Unauthorized'}, { status: 401 })
        }

        const tokenPayload = jwt.verify(token, JWT_SEC) as IJwtPayload;

        (req as IAuthorizedRequst).user = { id: tokenPayload.id, role: tokenPayload.role, location: tokenPayload.location };

        if (requiredRole && requiredRole !== tokenPayload.role) {
            return NextResponse.json({code: 403, message: 'Access Denied'}, { status: 403 })
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({code: 401, message: 'Invalid Token'}, { status: 401 })
    }
}
