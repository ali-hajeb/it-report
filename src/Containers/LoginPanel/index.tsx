'use client'
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Button, Center, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import axiosInstance from "@/src/config/axios";
import Logo from '@/public/logo-violet.png';
import { userActions } from "@/src/lib/module/user";

export type LoginForm = {
    username: string;
    password: string;
}

// export interface LoginPanelProps {
//     loginHandler: (data: LoginForm) => Promise<AxiosResponse<any, any, {}>>;
// }

export default function LoginPanel({}) {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const loginForm = useForm<LoginForm>({
        mode: 'controlled',
        initialValues: {
            username: '',
            password: '',
        }
    })

    const loginOnClickHandler = ({ username, password }: LoginForm) => {
        setLoading(true);
        userActions.login({ username, password })
            .then(res => {
                console.log(res.data);
                // redirect('/dashboard');
                router.refresh();
                router.push('/dashboard')
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Container w={550}>
            <Center>
                <Paper py={'md'} px={'lg'} bg={'white'} shadow='xl' radius={'md'}>
                    <Image loading="eager" src={Logo} style={{margin: '0 auto'}} alt='logo' width={256} height={256}/>
                    <Title order={1} ta={'center'} c={'violet.7'} mb={10} fz={'h2'}>
                        سامانه گزارش و ثبت مستندات واحد IT
                    </Title>
                    <Title order={2} ta={'center'} c={'gray.6'} fz={'h4'}>
                        دانشکده علوم پزشکی بهبهان
                    </Title>

                    <Box>
                        <Form form={loginForm} onSubmit={loginOnClickHandler}>
                            <Stack gap={'md'} mt={'md'}>
                                <TextInput
                                    label="نام کاربری"
                                    key={loginForm.key('username')}
                                    {...loginForm.getInputProps('username')}
                                />
                                <PasswordInput
                                    label="گذرواژه"
                                    key={loginForm.key('password')}
                                    {...loginForm.getInputProps('password')}
                                />
                                <Button loading={isLoading} type="submit" fullWidth>
                                    ورود
                                </Button>
                                <Button variant='outline' onClick={async () => {
                                    await axiosInstance.post('/auth/register', { firstName: 'admin', lastName: 'admin', username: 'admin', password: 'admin', location: '690eeb31852c7d9936ae31f8'})
                                }}>test</Button>
                            </Stack>
                        </Form>
                    </Box>
                </Paper>
            </Center>
        </Container>
    );
}
