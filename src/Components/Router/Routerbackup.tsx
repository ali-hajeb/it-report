import { IButtonState } from "@/src/common/type/button.types";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import UserContext from "@/src/Contexts/UserContext";
import { IRouterBackupPopulated, IRouterPopulated } from "@/src/lib/module/common/types";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { INewRouterBackup, IRouterBackup, routerActions } from '@/src/lib/module/router';
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { getCustomFieldValue, getRouterBackupCustomFieldValue } from "./utils";
import { routerBackupSchemaFields } from "./constants";
import { filters } from "./constants";
import { RouterBackupForm } from "./types";

const LIMIT = MAX_ROWS;

export interface RouterBackupProps {
    location?: string;
    routerBackups: IRouterBackupPopulated[];
    setRouterBackups:  Dispatch<SetStateAction<IRouterBackupPopulated[]>>;
}

export default function RouterBackup({
    location,
    routerBackups,
    setRouterBackups
}: RouterBackupProps) {
    const userContext = useContext(UserContext);
    const [lastBackup, setLastBackup] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IRouterBackupPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [routerOptions, setRouterOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const routerBackupForm = useForm<RouterBackupForm>({
        mode: 'controlled',
        initialValues: {
            router: '',
            routerName: '',
            storage: '',
            operator: '',
            type: '',
            desc: '',
            location: '',
        },
    })

    useEffect(() => {
        routerActions.getRouterBackups({ location, skip: page.toString() })
            .then((res) => {
                setRouterBackups(res.data.routerBackups);
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
        routerBackupForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newrouterBackupHandler = () => {
        setEditMode(null);
        open();
    }

    const deleterouterBackupHandler = (id: string) => {
        setLoading(true);
        routerActions.deleteRouterBackup(id)
            .then(_ => {
                setRouterBackups(s => {
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
        const routerBackup = routerBackups.find(r => r._id === id);
        if (routerBackup) {
            setViewMode(routerBackup);
            open();
        }
    }

    const editrouterBackupHandler = (id: string) => {
        console.log(id);
        const item = routerBackups.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { lastBackupDate, router, ...data} = item;
            routerBackupForm.setValues({
                ...data,
                router: router._id,
                location: data.location._id,
            });
            lastBackupDate && setLastBackup(lastBackupDate);
            setEditMode(id);
            open();
        }
    }


    const calendarRouterBackupOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setLastBackup(date.toDate().toISOString());
    };

    const formOnSubmit = (values: RouterBackupForm) => {
        console.log('routerBackup submit');
        const selectedDevice = routerOptions.find(d => d.value === values.router);
        const standardValue = {
            ...values,
            lastBackupDate: lastBackup,
            routerName: selectedDevice?.label || '',
        } as INewRouterBackup;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            routerActions.updateRouterBackup({_id: editMode, ...standardValue}).then(res => {
                setRouterBackups(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.routerBackup};
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
            routerActions.createRouterBackup(standardValue).then(res => {
                setRouterBackups(s => {
                    return [...s, {...res.data?.routerBackup}];
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
        routerActions.getRouterBackups({...query})
            .then((res) => {
                setRouterBackups(res.data.routerBackups);
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
            customFieldValue={getRouterBackupCustomFieldValue}
            fields={routerBackupSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="گزارش پشتیبان"
            editMode={editMode}>
            <Form form={routerBackupForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    <InputWrapper label='تاریخ آخرین پشتیبان‌گیری'>
                        <DatePicker
                            containerStyle={{width: '100%'}}
                            render={(value, openCalendar) => 
                                <Group>
                                    <Button p={4} maw={32} mah={32} onClick={openCalendar}><IconCalendar size={24} /></Button>
                                    <Input style={{flexGrow: 2}} value={value} readOnly/>
                                </Group>
                            } 
                            calendar={persian}
                            locale={persian_fa} 
                            value={lastBackup}
                            onChange={calendarRouterBackupOnChangeHandler}
                            calendarPosition="center" />
                    </InputWrapper>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={routerBackupForm.key('location')}
                                {...routerBackupForm.getInputProps('location')}
                            />
                    }
                    <Select
                        label='روتر'
                        placeholder="دستگاه مورد نظر را انتخاب کنید..."
                        data={routerOptions}
                        key={routerBackupForm.key('router')}
                        {...routerBackupForm.getInputProps('router')}
                        searchable/>
                    {
                        renderFormFromSchema(routerBackupSchemaFields, routerBackupForm)
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
            newItem={newrouterBackupHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            title="گزارش پشتیبان" />
        <TableView.TableContainer
            customFieldValue={getRouterBackupCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={routerBackups}
            fields={routerBackupSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleterouterBackupHandler}
            editItemHandler={editrouterBackupHandler}
            maxRows={MAX_ROWS} />
    </TableView>
}
