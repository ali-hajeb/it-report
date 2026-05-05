'use client'
import Contract from "@/src/Components/Contract";
import { IContract } from "@/src/lib/module/contracts";
import { Title } from "@mantine/core";
import { useState } from "react";

export interface ContractPanelProps {
    location?: string;
    title?: string;
}

export default function ContractPanel({
    location,
    title
}: ContractPanelProps) {
    const [contracts, setContracts] = useState<IContract[]>([]);
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Contract location={location} contracts={contracts} setContracts={setContracts}/>
    </>;
}
