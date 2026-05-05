'use client'
import ContractPanel from "@/src/Containers/ContractPanel";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function ContractPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('قراردادها')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);

    return <ContractPanel title="قراردادها"/>
}
