import { INewRouter, routerActions } from "@/src/lib/module/router";
import { Button, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { IButtonState } from "@/src/common/type/button.types";
import { MAX_ROWS } from "@/src/Constants";
import { RouterForm } from "./types";
import { routerSchemaFields, filters } from "./constants";
import { getCustomFieldValue } from "./utils";
import { IRouterPopulated } from "@/src/lib/module/common/types";
import UserContext from "@/src/Contexts/UserContext";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { antennaActions, IAntenna } from "@/src/lib/module/antenna";

const LIMIT = MAX_ROWS;

export interface RouterListProps {
    location?: string;
    routers: IRouterPopulated[];
    setRouters: Dispatch<SetStateAction<IRouterPopulated[]>>;
}

export default function RouterList({
    location,
    routers,
    setRouters
}: RouterListProps) {
    const userContext = useContext(UserContext);
    const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());
    const [date, setDate] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IRouterPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [antennaOptions, setAntennaOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const routerForm = useForm<RouterForm>({
        mode: 'controlled',
        initialValues: {
            name: '',
            model: '',
            deviceType: '',
            brand: '',
            os: '',
            osVersion: '',
            managementIP: '',
            lanWanIP: '',
            subnetGateway: '',
            location: userContext?.location?._id || '',
            role: '',
            vlans: [], 
            routingProtocols: '',
            natPat: '',
            dhcpEnabled: false,
            vpnEnabled: false,
            vpnType: '',
            supportResponsible: '',
            notes: '',
            coordination: '',
            connectedAntenna: '',
        },
    })

    useEffect(() => {
        routerActions.getRouters({ location, skip: page.toString() })
            .then((res) => {
                setRouters(res.data.routers);
                console.log('rec', res.data.routers);
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
        antennaActions.getAntennas(params)
            .then((res) => {
                const antennas = res.data.antennas as IAntenna[];
                const antennaOptions = antennas.map(l => ({value: l._id, label: l.name}));
                console.log('antenna opt', antennaOptions);
                setAntennaOptions(antennaOptions);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const modalOnCloseHandler = () => {
        routerForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newRouterHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteRouterHandler = (id: string) => {
        setLoading(true);
        routerActions.deleteRouter(id)
            .then(_ => {
                setRouters(s => {
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
        const router = routers.find(r => r._id === id);
        if (router) {
            setViewMode(router);
            open();
        }
    }

    const editRouterHandler = (id: string) => {
        console.log(id);
        const item = routers.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { lastConfigUpdate, installationDate, ...data} = item;
            routerForm.setValues({
                ...data,
                coordination: data.coordination.join(','),
                location: data.location._id,
                connectedAntenna: data.connectedAntenna._id,
            });
            lastConfigUpdate && setLastUpdate(lastConfigUpdate);
            installationDate && setDate(installationDate);
            setEditMode(id);
            open();
        }
    }

    const calendarLastUpdateOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setLastUpdate(date.toDate().toISOString());
    };

    const calendarOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setDate(date.toDate().toISOString());
    };

    const formOnSubmit = (values: RouterForm) => {
        console.log('router submit');
        const coordinates = values.coordination.replaceAll(' ', '').split(','); 
        const standardValue = {
            ...values,
            installationDate: date,
            lastConfigUpdate: lastUpdate,
            coordination: coordinates.map(c => parseFloat(c)) as [number, number],
        } as INewRouter;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            routerActions.updateRouter({_id: editMode, ...standardValue}).then(res => {
                setRouters(s => {
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
            routerActions.createRouter(standardValue).then(res => {
                setRouters(s => {
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
        routerActions.getRouters({...query})
            .then((res) => {
                setRouters(res.data.routers);
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
            fields={routerSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="روتر"
            editMode={editMode}>
            <Form form={routerForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    <InputWrapper label='تاریخ نصب'>
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
                            value={date}
                            onChange={calendarOnChangeHandler}
                            calendarPosition="center" />
                    </InputWrapper>
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
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={routerForm.key('location')}
                                {...routerForm.getInputProps('location')}
                            />
                    }
                    {
                            <Select
                                label='آنتن متصل'
                                placeholder="انتخاب کنید"
                                data={antennaOptions}
                                key={routerForm.key('connectedAntenna')}
                                {...routerForm.getInputProps('connectedAntenna')}
                            />
                    }
                    {
                        renderFormFromSchema(routerSchemaFields, routerForm)
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
            newItem={newRouterHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={routerSchemaFields}
            data={routers}
            title="روتر" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={routers}
            fields={routerSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteRouterHandler}
            editItemHandler={editRouterHandler}
            // scrollContainer={2100}
            maxRows={MAX_ROWS} />
    </TableView>
}
