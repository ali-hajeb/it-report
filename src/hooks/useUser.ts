'use client'
import { useEffect, useState } from 'react';
import axiosInstance from '@/src/config/axios';
import type { IUserPopulated } from '@/src/lib/module/user';

export default function useUser() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUserPopulated | null>(null);

    useEffect(() => {
        axiosInstance.get('/auth/me')
            .then(res => {
                if (res.data && res.data.user) {
                    setUser(res.data.user as IUserPopulated)
                }
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { isLoading, user };
}
