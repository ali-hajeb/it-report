'use client'
import UsersPanel from "@/src/Containers/UserPanel/UsersPanel";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function UsersPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('کاربرها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);
    return <UsersPanel title="کاربران"/>;
}
