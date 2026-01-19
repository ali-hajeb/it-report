'use client'
import RequirementPanel from "@/src/Containers/RequirementPanel";
import TopbarContext from "@/src/Contexts/TopbarContext";
import { useContext, useEffect } from "react";

export default function RequirementPage() {
    const { setTitle } = useContext(TopbarContext);

    useEffect(() => {
        setTitle('نیاز سنجی')
        return () => {
            setTitle('سامانه گزارش مستندات')
        }
    }, []);

    return <RequirementPanel title="نیاز سنجی"/>
}
