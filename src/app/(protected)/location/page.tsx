'use client'
import LocationPanel from '@/src/Containers/LocationPanel/';
import TopbarContext from '@/src/Contexts/TopbarContext';
import { useContext, useEffect } from 'react';

export default function LocationPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('مراکز')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);
    return <LocationPanel />
}
