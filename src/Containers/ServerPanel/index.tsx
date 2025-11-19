'use client'
import Server from "@/src/Components/Server";
import { IServerPopulated } from "@/src/lib/module/common/types";
import { useState } from "react";

export interface ServerPanelProps {
    location?: string;
}

export default function ServerPanel({
    location,
}: ServerPanelProps) {
    const [servers, setServers] = useState<IServerPopulated[]>([]);
    return <Server location={location} servers={servers} setServers={setServers}/>;
}
