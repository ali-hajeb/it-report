import { IButtonState } from "@/src/common/type/button.types";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import UserContext from "@/src/Contexts/UserContext";
import { IServerPopulated } from "@/src/lib/module/common/types";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { serverActions } from '@/src/lib/module/server';
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { getCustomFieldValue } from "./utils";
import { serverSchemaFields } from "./constants";
import { filters } from "./constants";
import { ServerForm } from "./types";

const LIMIT = MAX_ROWS;

export interface ServerProps {
    location?: string;
    servers: IServerPopulated[];
    setServers:  Dispatch<SetStateAction<IServerPopulated[]>>;
}

export default function Server({
    location,
    servers,
    setServers
}: ServerProps) {
    const userContext = useContext(UserContext);
    const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());
    const [serverLaunchDate, setLaunchDate] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IServerPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const serverForm = useForm<ServerForm>({
        mode: 'controlled',
        initialValues: {
            serverName: '', 
            serverType: '', 
            brand: '', 
            model: '', 
            serialNumber: '', 
            internalIP: '', 
            externalIP: '', 
            os: '', 
            osVersion: '', 
            role: '', 
            activeServices: [], 
            cpuCores: '', 
            ramGB: '', 
            hddCapacityGB: '', 
            raid: '', 
            gpu: '', 
            networkInterfaces: '', 
            location: userContext?.role === 'ADMIN' && userContext.location._id || '',
            perciseLocation: '', 
            rackName: '', 
            hostname: '', 
            domainOrWorkgroup: '', 
            backupStatus: null, 
            importantSoftware: [], 
            currentStatus: null, 
            supportResponsible: '', 
            remoteAccess: '', 
            openPorts: [], 
            notes: '', 
        },
    })

    useEffect(() => {
        serverActions.getServers({ location, skip: page.toString() })
            .then((res) => {
                setServers(res.data.servers);
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

    const modalOnCloseHandler = () => {
        serverForm.reset();
        setEditMode(null);
        close();
    }

    const newserverHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteserverHandler = (id: string) => {
        setLoading(true);
        serverActions.deleteServer(id)
            .then(_ => {
                setServers(s => {
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
        const server = servers.find(r => r._id === id);
        if (server) {
            setViewMode(server);
            open();
        }
    }

    const editserverHandler = (id: string) => {
            console.log(id);
            const item = servers.find(a => a._id === id);
            if (item) {
                console.log(item);
                const { lastUpdateDate, launchDate, ...data} = item;
                serverForm.setValues({
                    ...data,
                    cpuCores: data.cpuCores.toString(),
                    ramGB: data.ramGB.toString(),
                    hddCapacityGB: data.hddCapacityGB?.toString() || '',
                    openPorts: data.openPorts?.map(p => p.toString()),
                    location: data.location._id,
                });
                lastUpdateDate && setLastUpdate(lastUpdateDate);
                launchDate && setLaunchDate(launchDate);
                setEditMode(id);
                open();
            }
    }


    const calendarLastUpdateOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setLastUpdate(date.toDate().toISOString());
    };

    const calendarLaunchDateOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setLaunchDate(date.toDate().toISOString());
    };

    const formOnSubmit = (values: ServerForm) => {
        console.log('server submit');
        const standardValue = {
            ...values,
            cpuCores: parseFloat(values.cpuCores),
            ramGB: parseFloat(values.ramGB),
            hddCapacityGB: parseFloat(values.hddCapacityGB || '0'),
            openPorts: values.openPorts?.map(p => parseInt(p)),
            backupStatus: values.backupStatus || 'Inactive',
            currentStatus: values.currentStatus || 'Reserved',
        }

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            serverActions.updateServer({_id: editMode, ...standardValue}).then(res => {
                setServers(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.server};
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
            serverActions.createServer(standardValue).then(res => {
                setServers(s => {
                    return [...s, {...res.data?.server}];
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
        serverActions.getServers({...query})
            .then((res) => {
                setServers(res.data.servers);
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
            customFieldValue={getCustomFieldValue}
            fields={serverSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="سرور"
            editMode={editMode}>
            <Form form={serverForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    <InputWrapper label='تاریخ آخرین به‌روزرسانی'>
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
                            value={lastUpdate}
                            onChange={calendarLastUpdateOnChangeHandler}
                            calendarPosition="center" />
                    </InputWrapper>
                    <InputWrapper label='تاریخ راه‌اندازی'>
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
                            value={serverLaunchDate}
                            onChange={calendarLaunchDateOnChangeHandler}
                            calendarPosition="center" />
                    </InputWrapper>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={serverForm.key('location')}
                                {...serverForm.getInputProps('location')}
                            />
                    }
                    {
                        renderFormFromSchema(serverSchemaFields, serverForm)
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
            newItem={newserverHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            title="سرور" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={servers}
            fields={serverSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteserverHandler}
            editItemHandler={editserverHandler}
            scrollContainer={1800}
            maxRows={MAX_ROWS} />
    </TableView>
}
