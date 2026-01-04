'use client'
import { useContext, useEffect } from 'react'
import AntennaPanel from "@/src/Containers/AntennaPanel";
import TopbarContext from '@/src/Contexts/TopbarContext';

export default function AntennaPage({}) {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('آنتن‌ها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);

    return <AntennaPanel title="آنتن‌ها"/>
}
