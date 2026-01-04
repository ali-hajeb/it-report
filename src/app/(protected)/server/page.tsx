'use client'
import ServerPanel from "@/src/Containers/ServerPanel";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function ServerPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('سرورها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);
    return <ServerPanel title="سرورها"/>
}
