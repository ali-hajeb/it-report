'use client'
import { Title } from "@mantine/core";
import { IBlogPopulated } from '@/src/lib/module/common/types';
import Blogs from '@/src/Components/Blog';
import { useState } from "react";

export interface BlogPanelProps {
    location?: string;
    title?: string;
}

export default function BlogPanel({
    location,
    title
}: BlogPanelProps) {
    const [blogs, setBlogs] = useState<IBlogPopulated[]>([]);
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Blogs location={location} blogs={blogs} setBlogs={setBlogs}/>
    </>;
}
