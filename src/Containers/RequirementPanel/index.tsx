'use client'
import Requirement from "@/src/Components/Requirement";
import { IRequirementPopulated } from "@/src/lib/module/common/types";
import { Title } from "@mantine/core";
import { useState } from "react";

export interface RequirementPanelProps {
    location?: string;
    title?: string;
}

export default function RequirementPanel({
    location,
    title
}: RequirementPanelProps) {
    const [requirements, setRequirements] = useState<IRequirementPopulated[]>([]);
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Requirement location={location} requirements={requirements} setRequirements={setRequirements}/>
    </>;
}
