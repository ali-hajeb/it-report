'use client'
import Asset from "@/src/Components/Asset";
import { IAssetPopulated } from "@/src/lib/module/common/types";
import { Title } from "@mantine/core";
import { useState } from "react";

export interface AssetPanelProps {
    location?: string;
    title?: string;
}

export default function AssetPanel({
    location,
    title
}: AssetPanelProps) {
    const [assets, setAssets] = useState<IAssetPopulated[]>([]);
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Asset location={location} assets={assets} setAssets={setAssets}/>
    </>;
}
