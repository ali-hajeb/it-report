import { INewRouterInterface, routerActions } from "@/src/lib/module/router";
import { Button, Select, Stack } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IButtonState } from "@/src/common/type/button.types";
import { MAX_ROWS } from "@/src/Constants";
import { RouterInterfaceForm } from "./types";
import { filters, routerInterfaceSchemaFields } from "./constants";
import { getRouterInterfaceCustomFieldValue } from "./utils";
import { IRouterInterfacePopulated, IRouterPopulated } from "@/src/lib/module/common/types";
import UserContext from "@/src/Contexts/UserContext";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { ILocation, locationActions } from "@/src/lib/module/location";

const LIMIT = MAX_ROWS;

export interface RouterInterfaceProps {
    location?: string;
    routerInterfaces: IRouterInterfacePopulated[];
    setRouterInterfaces: Dispatch<SetStateAction<IRouterInterfacePopulated[]>>;
}

export default function RouterInterface({
    location,
    routerInterfaces,
    setRouterInterfaces
}: RouterInterfaceProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IRouterInterfacePopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [routerOptions, setRouterOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const routerInterfaceForm = useForm<RouterInterfaceForm>({
        mode: 'controlled',
        initialValues: {
            router: '',
            routerName: '',
            interface: '',
            connectionType: '',
            ip: '',
            subnet: '',
            status: '',
            desc: '',
            location: '',
        },
    })

    useEffect(() => {
        routerActions.getRouterInterfaces({ location, skip: page.toString() })
            .then((res) => {
                setRouterInterfaces(res.data.routerInterfaces);
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

        let params = {};
        if (userContext?.role === 'ADMIN') {
            params = {...params, location: userContext.location._id};
        }
        routerActions.getRouters(params)
            .then((res) => {
                const routers = res.data.routers as IRouterPopulated[];
                const routerOptions = routers.map(l => ({value: l._id, label: l.routerName}));
                console.log('opt', routerOptions);
                setRouterOptions(routerOptions);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const modalOnCloseHandler = () => {
        routerInterfaceForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newRouterInterfaceHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteRouterInterfaceHandler = (id: string) => {
        setLoading(true);
        routerActions.deleteRouterInterface(id)
            .then(_ => {
                setRouterInterfaces(s => {
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

    const viewMaintenanceReportHandler = (id: string) => {
        const router = routerInterfaces.find(r => r._id === id);
        if (router) {
            setViewMode(router);
            open();
        }
    }

    const editRouterInterfaceHandler = (id: string) => {
        console.log(id);
        const item = routerInterfaces.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { router,...data} = item;
            routerInterfaceForm.setValues({
                ...data,
                router: router._id,
                location: data.location._id,
            });
            setEditMode(id);
            open();
        }
    }

    const formOnSubmit = (values: RouterInterfaceForm) => {
        console.log('router submit');
        const selectedDevice = routerOptions.find(d => d.value === values.router);
        const standardValue = {
            ...values,
            routerName: selectedDevice?.label || '',
        } as INewRouterInterface;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            routerActions.updateRouterInterface({_id: editMode, ...standardValue}).then(res => {
                setRouterInterfaces(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.router};
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
            routerActions.createRouterInterface(standardValue).then(res => {
                setRouterInterfaces(s => {
                    console.log(s);
                    return [...s, {...res.data?.router}];
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
        routerActions.getRouterInterfaces({...query})
            .then((res) => {
                setRouterInterfaces(res.data.routers);
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

    return <TableView>
        <TableView.Modal 
            customFieldValue={getRouterInterfaceCustomFieldValue}
            fields={routerInterfaceSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="اینترفیس"
            editMode={editMode}>
            <Form form={routerInterfaceForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={routerInterfaceForm.key('location')}
                                {...routerInterfaceForm.getInputProps('location')}
                            />
                    }
                    <Select
                        label='روتر'
                        placeholder="دستگاه مورد نظر را انتخاب کنید..."
                        data={routerOptions}
                        key={routerInterfaceForm.key('router')}
                        {...routerInterfaceForm.getInputProps('router')}
                        searchable/>
                    {
                        renderFormFromSchema(routerInterfaceSchemaFields, routerInterfaceForm)
                    }
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
            filters={filters}
            newItem={newRouterInterfaceHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={routerInterfaceSchemaFields}
            data={routerInterfaces}
            title="اینترفیس" />
        <TableView.TableContainer
            customFieldValue={getRouterInterfaceCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={routerInterfaces}
            fields={routerInterfaceSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteRouterInterfaceHandler}
            editItemHandler={editRouterInterfaceHandler}
            maxRows={MAX_ROWS} />
    </TableView>
}
