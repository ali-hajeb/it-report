'use client'
import AssetPanel from "@/src/Containers/AssetPanel";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function AssetPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('سیستم‌ها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);

    return <AssetPanel title="سیستم‌ها"/>
}
