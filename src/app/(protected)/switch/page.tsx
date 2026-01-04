'use client'
import SwitchPanel from '@/src/Containers/SwitchPanel';
import TopbarContext from '@/src/Contexts/TopbarContext';
import { useContext, useEffect } from 'react';

export default function SwitchPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('سوئیچ‌ها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);
    return <SwitchPanel title='سوئیچ‌ها'/>
}
