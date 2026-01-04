'use client'
import RouterPanel from "@/src/Containers/RouterPanel";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function RouterPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('روترها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);
    return <RouterPanel title="روترها"/>
}
