'use client'
import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";

export type LoginForm = {
    username: string;
    password: string;
}

export default async function LoginPage() {
    const loginForm = useForm<LoginForm>({
        mode: 'controlled',
        initialValues: {
            username: '',
            password: '',
        }
    })
    return <Container>
        <Form form={loginForm}>
            <TextInput
                label="نام کاربری"
                placeholder="Username"
                key={loginForm.key('username')}
                {...loginForm.getInputProps('username')}
                />
            <PasswordInput
                label="گذرواژه"
                placeholder="Password"
                key={loginForm.key('password')}
                {...loginForm.getInputProps('password')}
                />
            <Button type="submit" fullWidth>
                ورود
            </Button>
        </Form>
    </Container>
}
