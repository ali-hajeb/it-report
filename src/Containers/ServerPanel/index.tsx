'use client'
import Server from "@/src/Components/Server";
import { IServerPopulated } from "@/src/lib/module/common/types";
import { Title } from "@mantine/core";
import { useState } from "react";

export interface ServerPanelProps {
    location?: string;
    title?: string;
}

export default function ServerPanel({
    location,
    title,
}: ServerPanelProps) {
    const [servers, setServers] = useState<IServerPopulated[]>([]);
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Server location={location} servers={servers} setServers={setServers}/>
    </>;
}
