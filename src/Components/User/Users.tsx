'use client'
import { IButtonState } from "@/src/common/type/button.types";
import { MAX_ROWS } from "@/src/Constants";
import { userActions, UserRole } from "@/src/lib/module/user";
import { IUserPopulated } from "@/src/lib/module/user";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserForm } from "./types";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import TableView, { renderFormFromSchema, SelectOption } from "../TableView";
import { Button, PasswordInput, Select, Stack } from "@mantine/core";
import { userSchemaFields } from "./constants";
import { filters } from "./constants";
import { getCustomFieldValue } from "./utils";
import { ILocation, locationActions } from "@/src/lib/module/location";
import UserContext from "@/src/Contexts/UserContext";

const LIMIT = MAX_ROWS;

export default function Users() {
    const userContext = useContext(UserContext);
    const router = useRouter();
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<IUserPopulated | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUserPopulated[]>([]);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        userActions.getUsers({ skip: page.toString(), limit: LIMIT.toString() })
            .then((res) => {
                setUsers(res.data.users);
                setTotalPages(Math.ceil(res.data.count / LIMIT));
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false)
            });
    }, [page]);

    useEffect(() => {
        if (userContext?.role === 'MANAGER') {
            locationActions.getLocations()
                .then((res) => {
                    const locations = res.data.locations as ILocation[];
                    const locationOptions = locations.map(l => ({value: l._id, label: l.name}));
                    setLocationOptions(locationOptions);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, []);

    const userForm = useForm<UserForm>({
        mode: 'controlled',
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            location: '',
            role: '',
        },
    })

    const modalOnCloseHandler = () => {
        userForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newUserHandler = () => {
        setEditMode(null);
        open();
    }

    const editUserHandler = (id: string) => {
        const item = users.find(a => a._id === id);
        if (item) {
            console.log(locationOptions);
            userForm.setValues({
                ...item,
                password: '',
                location: item.location._id
            });
            setEditMode(id);
            open();
        }
    }

    const deleteUserHandler = (id: string) => {
        setLoading(true);
        userActions.deleteUser(id)
            .then(res => {
                setUsers(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === id);
                    if (index > -1) {
                        updated.splice(index, 1);
                    }
                    return updated;
                })
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const viewItemHander = (id: string) => {
        // router.push(`/user/${id}`);
        const user = users.find(r => r._id === id);
        console.log(user);
        if (user) {
            setViewMode(user);
            open();
        }
    }

    const formOnSubmit = (values: UserForm) => {
        console.log('user submit');
        const standardValue = {
            ...values,
            role: values.role as UserRole
        }
        setLoading(true);
        if (editMode) {
            userActions.updateUser({_id: editMode, ...standardValue}).then(res => {
                setUsers(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.user};
                    }
                    return updated;
                })
                setBtnState({color: 'green', icon: <IconCheck size={16} />});
            })
                .catch(error => {
                    console.error(error);
                    setBtnState({color: 'red', icon: <IconExclamationCircle size={16} />});
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setBtnState({color: undefined, icon: undefined});
                    }, 1000);
                });
        } else {
            userActions.createUser(standardValue).then(res => {
                setUsers(s => {
                    return [...s, {...res.data?.user}];
                })
                setBtnState({color: 'green', icon: <IconCheck size={16} />});
            })
                .catch(error => {
                    console.error(error);
                    setBtnState({color: 'red', icon: <IconExclamationCircle size={16} />});
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setBtnState({color: undefined, icon: undefined});
                    }, 1000);
                });
        }
    }

    const searchHandler = (query: Record<string, string>) => {
        setListLoading(true);
        userActions.getUsers({...query})
            .then((res) => {
                    setUsers(res.data.users);
                    setPage(0);
                    // setTotalPages(res.data.count);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false);
            });
    };

    const reportHandler = () => {
    };

    return <TableView>
        <TableView.Modal
            close={close}
            editMode={editMode}
            viewMode={viewMode}
            fields={userSchemaFields}
            customFieldValue={getCustomFieldValue}
            opened={opened}
            title='کاربر'
            closeHandler={modalOnCloseHandler}>
            <Form form={userForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        renderFormFromSchema(userSchemaFields, userForm)
                    }
                    {
                        <Select
                            label='نام مرکز'
                            placeholder="انتخاب کنید"
                            data={locationOptions}
                            key={userForm.key('location')}
                            {...userForm.getInputProps('location')}
                        />
                    }
                    <PasswordInput
                        label='گذرواژه'
                        placeholder="۶ کاراکتر"
                        key={userForm.key('password')}
                        {...userForm.getInputProps('password')} />
                    <Button type="submit" 
                        loading={isLoading} 
                        color={btnState.color} 
                        rightSection={btnState.icon}
                        fullWidth>
                        ثبت
                    </Button>
                </Stack>
            </Form>
        </TableView.Modal>
        <TableView.TopBar 
            title='کاربر'
            reportHandler={reportHandler}
            searchHandler={searchHandler}
            newItem={newUserHandler}
            reportFields={userSchemaFields}
            data={users}
            filters={filters}>
        </TableView.TopBar>
        <TableView.TableContainer 
            data={users}
            isLoading={isListLoading}
            maxRows={LIMIT}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            fields={userSchemaFields}
            viewItemHandler={viewItemHander}
            deleteItemHandler={deleteUserHandler}
            editItemHandler={editUserHandler}
            customFieldValue={getCustomFieldValue}>
        </TableView.TableContainer>
    </TableView>
}
