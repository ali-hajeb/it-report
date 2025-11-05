'use client'
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Paper } from "@mantine/core";
import UserContext from "@/src/Contexts/UserContext";
import { userActions } from "@/src/lib/module/user";

export default function DashboardPage() {
    const userContext = useContext(UserContext);
    const router = useRouter();

    return <Container bg={'white'} fluid>
                <ul>
                    <li>home</li>
                    <li>page</li>
                    {userContext?.role === 'MANAGER' && <li>manager</li>}
                    {userContext?.role === 'ADMIN' && <li>admin</li>}
                    {(userContext?.role === 'ADMIN' || userContext?.role === 'MANAGER') && <li>both</li>}
                </ul>

                <Button onClick={() => {
                    userActions.logout()
                        .then((res) => {
                            console.log(res.data);
                            router.refresh();
                            router.replace('/');
                        }).catch(error => {
                            console.error(error);
                        })
                }}>خروج</Button>
    </Container>
}
