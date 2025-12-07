import Users from "@/src/Components/User/Users";
import { Title } from "@mantine/core";

export interface UserPanelProps {
    title?: string;
}

export default function UsersPanel({
    title
}: UserPanelProps) {
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Users />
    </>;
}
