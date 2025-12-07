import { INewSwitch, switchActions } from "@/src/lib/module/switch";
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
import { SwitchForm } from "./types";
import { switchSchemaFields, filters } from "./constants";
import { getCustomFieldValue } from "./utils";
import { ISwitchPopulated } from "@/src/lib/module/common/types";
import UserContext from "@/src/Contexts/UserContext";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { antennaActions, IAntenna } from "@/src/lib/module/antenna";

const LIMIT = MAX_ROWS;

export interface SwitchListProps {
    location?: string;
    switches: ISwitchPopulated[];
    setSwitches: Dispatch<SetStateAction<ISwitchPopulated[]>>;
}

export default function SwitchList({
    location,
    switches,
    setSwitches
}: SwitchListProps) {
    const userContext = useContext(UserContext);
    const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());
    const [date, setDate] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<ISwitchPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [antennaOptions, setAntennaOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const switchForm = useForm<SwitchForm>({
        mode: 'controlled',
        initialValues: {
            location: userContext?.location?._id || '',
            name: '',
            brandModel: '',
            deviceType: '',
            portCount: '',
            poe: false,
            managementIP: '',
            activeVlans: [],
            uplinkPorts: [],
            role: '',
            currentStatus: '',
            notes: '',
            coordination: '',
            connectedAntenna: '',
        },
    })

    useEffect(() => {
        switchActions.getSwitches({ location, skip: page.toString() })
            .then((res) => {
                setSwitches(res.data._switches);
                console.log('rec', res.data._switches);
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
                    console.log('location` opt', locationOptions);
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
        switchForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newSwitchHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteSwitchHandler = (id: string) => {
        setLoading(true);
        switchActions.deleteSwitch(id)
            .then(_ => {
                setSwitches(s => {
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
        const _switch = switches.find(r => r._id === id);
        if (_switch) {
            setViewMode(_switch);
            open();
        }
    }

    const editSwitchHandler = (id: string) => {
        const item = switches.find(a => a._id === id);
        console.log('edit', item);
        if (item) {
            const {portCount, ...data} = item;
            switchForm.setValues({
                ...data,
                portCount: portCount.toString(),
                coordination: data.coordination.join(','),
                location: data.location._id,
                connectedAntenna: data.connectedAntenna._id,
                poe: data.poe
            });
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

    const formOnSubmit = (values: SwitchForm) => {
        console.log('switch submit');
        const coordinates = values.coordination.replaceAll(' ', '').split(','); 
        const standardValue = {
            ...values,
            portCount: parseInt(values.portCount),
            coordination: coordinates.map(c => parseFloat(c)) as [number, number],
        } as INewSwitch;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            switchActions.updateSwitch({_id: editMode, ...standardValue}).then(res => {
                setSwitches(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?._switch};
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
            switchActions.createSwitch(standardValue).then(res => {
                setSwitches(s => {
                    return [...s, {...res.data?._switch}];
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
        switchActions.getSwitches({...query})
            .then((res) => {
                setSwitches(res.data._switches);
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
            fields={switchSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="سوئیچ"
            editMode={editMode}>
            <Form form={switchForm} onSubmit={formOnSubmit}>
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
                                key={switchForm.key('location')}
                                {...switchForm.getInputProps('location')}
                            />
                    }
                    {
                            <Select
                                label='آنتن متصل'
                                placeholder="انتخاب کنید"
                                data={antennaOptions}
                                key={switchForm.key('connectedAntenna')}
                                {...switchForm.getInputProps('connectedAntenna')}
                            />
                    }
                    {
                        renderFormFromSchema(switchSchemaFields, switchForm)
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
            newItem={newSwitchHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={switchSchemaFields}
            data={switches}
            title="سوئیچ" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={switches}
            fields={switchSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteSwitchHandler}
            editItemHandler={editSwitchHandler}
            maxRows={MAX_ROWS} />
    </TableView>
}
