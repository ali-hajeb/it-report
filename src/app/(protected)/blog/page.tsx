'use client'
import BlogPanel from "@/src/Containers/BlogPanel/page";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function RouterPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('فرآیندها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);
    return <BlogPanel title="فرآیندها"/>
}
