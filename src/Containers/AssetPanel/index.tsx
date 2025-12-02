'use client'
import Asset from "@/src/Components/Asset";
import { IAssetPopulated } from "@/src/lib/module/common/types";
import { useState } from "react";

export interface AssetPanelProps {
    location?: string;
}

export default function AssetPanel({
    location,
}: AssetPanelProps) {
    const [assets, setAssets] = useState<IAssetPopulated[]>([]);
    return <Asset location={location} assets={assets} setAssets={setAssets}/>;
}
